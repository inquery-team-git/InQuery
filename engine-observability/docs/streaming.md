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

1. Run additional container:

   ```bash
   docker compose up -d database adminer
   ```

1. Your Database configuration should look like below
   ````
   DATABASE_TYPE=mysql
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USERNAME=user
   DATABASE_PASSWORD=secret
   DATABASE_NAME=inquery_app
   DATABASE_SSL_ENABLED=false
   ````

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

1. Run container:

   ```bash
   docker compose up --build

   ```

1. Open <http://localhost:3003>
