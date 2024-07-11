# Installation

For a local setup, where both the Database and Trino Cluster are Dockerized, Follow below instructions.

---
### Requirements

- Node.js 18+ and npm
---


## Quick run (PostgreSQL)

If you want quick run your app, you can use following commands:

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/inquery-team-git/mvp_platform my-app
   ```

1. Go to folder, and copy `env-example` as `env-vars`

   ```bash
   cd my-app/
   cp env-example env-vars
   ```


1. Run container:

   ```bash
   docker compose -f local.docker-compose.yml --env-file env-vars up --build -d
   
   ```

 Client is running on <http://localhost:3000>
 API Service is running on <http://localhost:3001>
 Streaming Service is running on <http://localhost:3003>
