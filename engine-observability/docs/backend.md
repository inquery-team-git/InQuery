# Installation

This document will help you how you can start only backend service for your trino cluster

---
### Requirements

- Node.js 18+ and npm
---

## Comfortable development (PostgreSQL)

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/inquery-team-git/mvp_platform my-app
   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd my-app/
   cp env-example backend/.env
   ```

1. Go to `backend` folder

   ```bash
   cd backend
   ```

1. Update values for `DATABASE` related environment variables with your pre hosted Database Configuration. InQuery Supportpre hosted Database Configuration for Both `PostgreSQL` and `MySQL`.
   - If your pre hosted Database is `PostgreSQL`, your Database configuration should look like below
      ```
      DATABASE_TYPE=postgres
      DATABASE_HOST=<your-database-host>
      DATABASE_PORT=<your-database-port>
      DATABASE_USERNAME=<your-database-username>
      DATABASE_PASSWORD=<your-database-password>
      DATABASE_NAME=<your-database-name>
      DATABASE_SSL_ENABLED=false
      ```

   - If your pre hosted Database is `MySQL`, your Database configuration should look like below

      ```
      DATABASE_TYPE=mysql
      DATABASE_HOST=<your-database-host>
      DATABASE_PORT=<your-database-port>
      DATABASE_USERNAME=<your-database-username>
      DATABASE_PASSWORD=<your-database-password>
      DATABASE_NAME=<your-database-name>
      DATABASE_SSL_ENABLED=true
      ```

   - If you want to use local dockerized database
      - Run additional container ():

         ```bash
         docker compose up -d database adminer
         ```
      - Your Database configuration should look like below
         ````
         DATABASE_TYPE=mysql
         DATABASE_HOST=localhost
         DATABASE_PORT=3306
         DATABASE_USERNAME=user
         DATABASE_PASSWORD=secret
         DATABASE_NAME=inquery_app
         DATABASE_SSL_ENABLED=false
         ````

1. Start local redis server
      ```bash
      docker compose up -d redis
      ```

1. Install required node version if not already installed

   ```bash
   nvm install v18.17.0 
   ```

1. Install dependency

   ```bash
   nvm use v18.17.0
   npm install
   ```

1. Run app in dev mode

   ```bash
   npm run start:dev
   ```

1. Open <http://localhost:3001>

---

## Quick run (PostgreSQL)

If you want quick run your app, you can use following commands:

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/inquery-team-git/mvp_platform my-app
   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd my-app/
   cp env-example backend/.env
   ```

1. Go to `backend` folder

   ```bash
   cd backend
   ```

1. Database Configuration
   - If your pre hosted Database is `PostgreSQL`, your Database configuration should look like below
      ```
      DATABASE_TYPE=postgres
      DATABASE_HOST=<your-database-host>
      DATABASE_PORT=<your-database-port>
      DATABASE_USERNAME=<your-database-username>
      DATABASE_PASSWORD=<your-database-password>
      DATABASE_NAME=<your-database-name>
      DATABASE_SSL_ENABLED=false
      ```
   
   - If your pre hosted Database is `MySQL`, your Database configuration should look like below

      ```
      DATABASE_TYPE=mysql
      DATABASE_HOST=<your-database-host>
      DATABASE_PORT=<your-database-port>
      DATABASE_USERNAME=<your-database-username>
      DATABASE_PASSWORD=<your-database-password>
      DATABASE_NAME=<your-database-name>
      DATABASE_SSL_ENABLED=true
      ```

1. Run container:

   ```bash
   docker compose up --build
   
   ```

1. Open <http://localhost:3001>