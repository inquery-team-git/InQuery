# Installation

## Table of Contents <!-- omit in toc -->

- [Comfortable development (PostgreSQL + TypeORM)](#comfortable-development-postgresql--typeorm)
- [Quick run (PostgreSQL + TypeORM)](#quick-run-postgresql--typeorm)
  - [Video guideline](#video-guideline)
- [Links](#links)

---

## Comfortable development (PostgreSQL + TypeORM)

1. Clone repository

   ```bash
   git clone --depth 1 repo_url backend
   ```

1. Go to folder, and copy `env-example-relational` as `.env`.

   ```bash
   cd backend/
   cp env-example-relational .env
   ```

1. Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

   Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

1. Run additional container:

   ```bash
   docker compose up -d postgres adminer maildev
   ```

1. Install dependency

   ```bash
   npm install
   ```

1. Run app configuration

   > You should run this command only the first time on initialization of your project, all next time skip it.

   ```bash
   npm run app:config
   ```

1. Run migrations

   ```bash
   npm run migration:run
   ```

1. Run seeds

   ```bash
   npm run seed:run:relational
   ```

1. Run app in dev mode

   ```bash
   npm run start:dev
   ```

1. Open <http://localhost:3001>

---

## Quick run (PostgreSQL + TypeORM)

If you want quick run your app, you can use following commands:

1. Clone repository

   ```bash
   git clone --depth 1 repo_url backend
   ```

1. Go to folder, and copy `env-example-relational` as `.env`.

   ```bash
   cd backend/
   cp env-example-relational .env
   ```

1. Run containers

   ```bash
   docker compose up -d
   ```

1. For check status run

   ```bash
   docker compose logs
   ```

1. Open <http://localhost:3001>

## Links

- Swagger (API docs): <http://localhost:3001/docs>
- Adminer (client for DB): <http://localhost:8080>
- Maildev: <http://localhost:1080>
