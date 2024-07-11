# Installation

Follow below instructions, If you prefer running the application with a Dockerized Database and utilizing a pre-hosted Trino Cluster in the cloud.

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

1. Go to folder, and copy `env-example` as `env-vars`.

   ```bash
   cd my-app/
   cp env-example env-vars
   ```

1. Update values for `DATABASE` related environment variables with Dockerized Database Configuration:

   ```
   DATABASE_TYPE=postgres
   DATABASE_HOST=postgres
   DATABASE_PORT=5432
   DATABASE_USERNAME=root
   DATABASE_PASSWORD=secret
   DATABASE_NAME=api
   ```

1. Update values for `APP_CLIENT_ID` with unique key provided by Inquery:

   ```
   APP_CLIENT_ID=inquery_app
   ```

1. Run container:

   ```bash
   docker compose -f docker-compose.yml --env-file env-vars up --build

   ```

1. Client is running on <http://localhost:3000>
1. API Service is running on <http://localhost:3001>
1. Streaming Service is running on <http://localhost:3003>
