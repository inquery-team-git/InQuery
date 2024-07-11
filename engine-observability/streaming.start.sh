#!/bin/sh
# set -e

/app/wait-for-it.sh $DATABASE_HOST:$DATABASE_PORT

echo ""

echo "Contents: $(ls)"

cd /app/streaming

# Start streaming server
python src/main.py &
python3 src/delete_old_records.py
