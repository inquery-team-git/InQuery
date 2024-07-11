#!/bin/sh

cd /app

# Print debug information
echo "Current directory: $(pwd)"
echo "Contents of /frontend/: $(ls ./frontend)"

# Start frontend server
HOSTNAME="0.0.0.0" node ./frontend/server.js
