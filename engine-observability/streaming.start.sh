#!/bin/sh
# set -e

echo ""

echo "Contents: $(ls)"

cd /app/streaming

# Start streaming server
python src/main.py &
python3 src/delete_old_records.py
