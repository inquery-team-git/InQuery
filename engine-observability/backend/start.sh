#!/bin/sh

/app/wait-for-it.sh $DATABASE_HOST:$DATABASE_PORT

cd /app/backend
npm run typeorm -- --dataSource=./database/data-source.js migration:run
# npm run ts-node ./database/seeds/relational/run-seed.js

cd ..
cd /app

echo "Current directory: $(pwd)"
echo "Contents of /backend/: $(ls ./backend)"

# Start backend server
node ./backend/main.js
