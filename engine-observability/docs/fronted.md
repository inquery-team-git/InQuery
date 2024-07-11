# Installation

This document will help you how you can start only frontend

---

### Requirements

- Node.js 18+ and npm

---

## Comfortable development

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/inquery-team-git/mvp_platform my-app
   ```

1. Go to `frontend` folder

   ```bash
   cd my-app/
   cd frontend
   ```

1. Change value of environment variable `API_BASE_URL` to your API Base URL in `next.config.js`

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
   npm run build:scss && npm run dev
   ```

1. Open <http://localhost:3000>

---

## Quick run

If you want quick run your app, you can use following commands:

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/inquery-team-git/mvp_platform my-app
   ```

1. Go to `frontend` folder

   ```bash
   cd my-app/
   cd frontend
   ```

1. Change value of environment variable `API_BASE_URL` to your API Base URL in `frontend/next.config.js`

1. Run container:

   ```bash
   docker compose up --build
   
   ```

1. Open <http://localhost:3000>