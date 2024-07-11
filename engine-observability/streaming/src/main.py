import asyncio
import nest_asyncio
from ClusterManager import ClusterManager

async def main():
    manager = ClusterManager()
    try:
        await manager.start()
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        print("Script interrupted by user.")
    except Exception as e:
        print(f"Exception: {e}")
    finally:
        await manager.stop()

if __name__ == "__main__":
    nest_asyncio.apply()
    asyncio.run(main())
