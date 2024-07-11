import aiohttp
import asyncio
from utils import str_to_timedelta, get_value, extract_stages


class TrinoCluster:
    def __init__(self, host, port):
        self.base_url = f"http://{host}:{port}"
        self.username = "inquery"
        self.host = host
        self.port = port
        self.session = None
        self.max_retries = 10
        self.retry_delay = 10  # seconds

    async def __aenter__(self):
        await self.connect_to_cluster()
        return self

    async def __aexit__(self, *err):
        if self.session:
            await self.session.close()
            self.session = None

    async def connect_to_cluster_with_max_retries(self):
        retry_attempts = 0
        while retry_attempts < self.max_retries:
            try:
                self.session = aiohttp.ClientSession()
                login_payload = {
                    "username": self.username,
                    "redirectPath": "",
                }
                login_url = self.base_url + "/ui/login"
                async with self.session.post(
                    login_url, data=login_payload
                ) as login_response:
                    self.session.cookie_jar.update_cookies(
                        login_response.__dict__["_history"][0].cookies
                    )

                cookies = self.session.cookie_jar.filter_cookies(
                    self.base_url
                ) | self.session.cookie_jar.filter_cookies(self.base_url + "/ui")
                if "Trino-UI-Token" in cookies:
                    print(f"Successfully connected to {self.host}:{self.port}\n")
                    return
                else:
                    raise ValueError("Failed to log in to the connected cluster.")
            except (aiohttp.ClientConnectorError, aiohttp.ClientError) as e:
                print(
                    f"Connection attempt {retry_attempts + 1} failed for {self.host}:{self.port}: {e}\n"
                )
                retry_attempts += 1
                await asyncio.sleep(self.retry_delay * retry_attempts)
        raise ConnectionError(
            f"Failed to connect to {self.host}:{self.port} after {self.max_retries} attempts"
        )

    async def connect_to_cluster(self):
        while True:
            try:
                self.session = aiohttp.ClientSession()
                login_payload = {
                    "username": self.username,
                    "redirectPath": "",
                }
                login_url = self.base_url + "/ui/login"
                async with self.session.post(
                    login_url, data=login_payload
                ) as login_response:
                    self.session.cookie_jar.update_cookies(
                        login_response.__dict__["_history"][0].cookies
                    )

                cookies = self.session.cookie_jar.filter_cookies(
                    self.base_url
                ) | self.session.cookie_jar.filter_cookies(self.base_url + "/ui")
                if "Trino-UI-Token" in cookies:
                    print(f"Successfully connected to {self.host}:{self.port}\n")
                    return
                else:
                    raise ValueError("Failed to log in to the connected cluster.")
            except (aiohttp.ClientConnectorError, aiohttp.ClientError) as e:
                print(
                    f"Connection attempt failed for {self.host}:{self.port}: {e}\n"
                )
                await asyncio.sleep(self.retry_delay)

    async def reconnect(self):
        await self.__aexit__()
        await asyncio.sleep(self.retry_delay)
        await self.connect_to_cluster()

    async def send_get_request(self, endpoint=""):
        api_url = self.base_url + endpoint
        retry_attempts = 0
        while retry_attempts < self.max_retries:
            try:
                async with self.session.get(api_url) as resp:
                    if resp.status == 200:
                        return await resp.json()
                    print(f"Failed to access API: Status code {resp.status}\n")
            except (aiohttp.ClientError, aiohttp.ServerDisconnectedError) as e:
                print(f"Request error: {e}\n")
                await self.reconnect()
                retry_attempts += 1
                await asyncio.sleep(self.retry_delay * retry_attempts)
        raise ValueError(
            f"Failed to send GET request to {endpoint} after {self.max_retries} attempts"
        )

    async def get_workers(self):
        workers = await self.send_get_request("/ui/api/worker")
        if workers is None:
            raise ValueError("Failed to retrieve workers.")
        return [worker["nodeId"] for worker in workers]

    async def get_uptime(self):
        cluster = await self.send_get_request("/ui/api/cluster")
        if cluster is None:
            raise ValueError("Failed to retrieve cluster uptime.")
        return str_to_timedelta(cluster["uptime"])

    async def get_and_process_worker_data(self, node_id, current_timestamp=None):
        api_response = await self.send_get_request(f"/ui/api/worker/{node_id}/status")
        if api_response is None:
            raise ValueError(f"Failed to retrieve data for worker {node_id}.")

        feats = [
            "processCpuLoad",
            "systemCpuLoad",
            "processors",
            "heapUsed",
            ("memoryInfo", "pool", "maxBytes"),
            ("memoryInfo", "pool", "freeBytes"),
            ("uptime",),
        ]

        dic = api_response["memoryInfo"]["pool"]["queryMemoryReservations"]
        task_dic = api_response["memoryInfo"]["pool"]["taskMemoryReservations"]
        tasks_length = len(task_dic)

        if not dic:
            dic[None] = None
        if not task_dic:
            task_dic[None] = None

        list_of_lists = [[k, v] + [node_id, current_timestamp] for k, v in dic.items()]
        list_of_tasks = [
            [k, v] + [node_id, current_timestamp] for k, v in task_dic.items()
        ]

        values = [
            (
                get_value(api_response, feat)
                if isinstance(feat, tuple)
                else api_response.get(feat, None)
            )
            for feat in feats
        ]
        return values, list_of_lists, list_of_tasks, tasks_length

    async def get_queries(self):
        api_response = await self.send_get_request("/ui/api/query")
        if api_response is None:
            raise ValueError("Failed to retrieve queries.")

        feats = [
            "queryId",
            ("queryStats", "createTime"),
            ("queryStats", "totalCpuTime"),
            ("queryStats", "cumulativeUserMemory"),
            "state",
            "sessionUser",
            "sessionSource",
        ]
        return [
            [
                (
                    get_value(query, feat)
                    if isinstance(feat, tuple)
                    else query.get(feat, None)
                )
                for feat in feats
            ]
            for query in api_response
        ]

    async def get_prog(self, all_stages, query_id):
        api_response = await self.send_get_request(f"/ui/api/query/{query_id}")
        if not isinstance(api_response, dict) or "outputStage" not in api_response:
            return -1
        extract_stages(all_stages, api_response["outputStage"])
        return 1

    async def get_progs(self, all_stages):
        queries = await self.get_queries()
        tasks = [self.get_prog(all_stages, query[0]) for query in queries]
        return await asyncio.gather(*tasks)
