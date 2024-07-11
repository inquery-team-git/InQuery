# Installation

This document will help you how you can start only streaming service for your trino cluster

---

## Comfortable development (PostgreSQL)

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/inquery-team-git/mvp_platform my-app
   ```

1. Go to folder, and copy `env-example` as `.env`.

   ```bash
   cd my-app/
   cp env-example streaming/.env
   ```

1. Go to `streaming` folder

   ```bash
   cd streaming
   ```

1. Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

1. Update values for `APP_CLIENT_ID` with unique key provided by Inquery:

   ```
   APP_CLIENT_ID=inquery_app
   ```

1. Run additional container:

   ```bash
   docker compose up -d postgres adminer

   ```

1. Install dependency

   ```bash
   pip install
   ```

1. Run app in dev mode

   ```bash
   python src/cluster_streaming.py
   ```

1. Open <http://localhost:3003>

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
   cp env-example streaming/.env
   ```

1. Go to `streaming` folder

   ```bash
   cd streaming
   ```

1. Update values for `APP_CLIENT_ID` with unique key provided by Inquery:

   ```
   APP_CLIENT_ID=inquery_app
   ```

1. Run container:

   ```bash
   docker compose up --build

   ```

1. Open <http://localhost:3003>
