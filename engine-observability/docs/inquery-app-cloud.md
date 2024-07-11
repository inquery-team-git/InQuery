# Installation

Follow below instructions, if you want to run the application with a self-hosted Database and Trino Cluster in the cloud.

---

### Requirements

- Node.js 18+ and npm

---

### Database Supports
- PostgreSQL
- MySQL

---

## Quick run

If you want quick run your app, you can use following commands:


1. From inside the folder, and copy `env-example` as `env-vars` to create the appropriate environment variable configuration.

   ```bash
   cd engine-observability/
   cp env-example env-vars
   ```

2. Update values for `DATABASE` related environment variables with your pre hosted Database Configuration. InQuery Supportpre hosted Database Configuration for Both `PostgreSQL` and `MySQL`.
   - If your pre hosted Database is `PostgreSQL`, your Database configuration should look like below

      ```
      DATABASE_TYPE=postgres
      ```

      ```
      DATABASE_HOST=<your-database-host>
      DATABASE_PORT=<your-database-port>
      DATABASE_USERNAME=<your-database-username>
      DATABASE_PASSWORD=<your-database-password>
      DATABASE_NAME=<your-database-name>
      ```

   - If your pre hosted Database is `MySQL`, your Database configuration should look like below

      ```
      DATABASE_TYPE=mysql
      ```

      ```
      DATABASE_HOST=<your-database-host>
      DATABASE_PORT=<your-database-port>
      DATABASE_USERNAME=<your-database-username>
      DATABASE_PASSWORD=<your-database-password>
      DATABASE_NAME=<your-database-name>
      DATABASE_SSL_ENABLED=true
      ```


3. Run container:

   ```bash
   docker compose -f cloud.docker-compose.yml --env-file env-vars up --build -d

   ```

Client is running on <http://localhost:3000>
API Service is running on <http://localhost:3001>
Streaming Service is running on <http://localhost:3003>
