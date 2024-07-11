#!/bin/sh
# set -e

/app/wait-for-it.sh postgres:5432

cd /app

# Start streaming server and
# Start Cleaning tables
python3 src/main.py &
python3 src/delete_old_records.py
