#!/bin/sh
# set -e

/app/wait-for-it.sh $DATABASE_HOST:$DATABASE_PORT

cd /app

# Start streaming server and
# Start Cleaning tables
python3 src/main.py &
python3 src/delete_old_records.py
