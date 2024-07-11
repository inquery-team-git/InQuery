import logging
import os
from logging.handlers import TimedRotatingFileHandler


def setup_logger(cluster_id):
    # Create a logs directory if it doesn't exist
    os.makedirs('logs', exist_ok=True)

    # Set up the logger
    logger = logging.getLogger(f"Cluster_{cluster_id}_Logger")
    logger.setLevel(logging.DEBUG)

    # Create a TimedRotatingFileHandler
    log_filename = f"logs/cluster_{cluster_id}.log"
    handler = TimedRotatingFileHandler(
        log_filename, when="midnight", interval=1, backupCount=0
    )
    handler.setLevel(logging.DEBUG)

    # Create a logging format
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)

    # Add the handler to the logger
    logger.addHandler(handler)

    return logger
