import asyncio
import nest_asyncio
from database import Database
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
import datetime


async def delete_old_records():
    print("Delete old records...")
    db_conn = Database()
    db_conn.clear_cluster_metrics_table()
    db_conn.clear_query_metrics_table()
    db_conn.clear_worker_metrics_table()
    db_conn.clear_task_metrics_table()
    db_conn.clear_query_task_memory_table()
    db_conn.clear_query_worker_memory_table()


def job():
    nest_asyncio.apply()
    current_time = datetime.datetime.now()
    with open("src/cron.log", "a") as log_file:
        print(f"Script run at {current_time}\n")
        log_file.write(f"Script run at {current_time}\n")
    asyncio.run(delete_old_records())


scheduler = BlockingScheduler()
trigger = CronTrigger(minute=15)
scheduler.add_job(job, trigger=trigger)

try:
    print("Scheduler started. Press Ctrl+C to exit.")
    scheduler.start()
except (KeyboardInterrupt, SystemExit):
    pass
