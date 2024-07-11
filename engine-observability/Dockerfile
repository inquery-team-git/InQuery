# Build backend ---------------------------
# Use the Node.js backend image as the base image
FROM node:18.20.3 AS backend-builder

RUN npm i -g @nestjs/cli typescript ts-node

# Set the working directory for the backend
WORKDIR /app/backend

# Copy the backend application files
COPY backend/package*.json ./
COPY backend/src/sql-queries ./sql-queries
# COPY backend/.env ./
RUN npm i

# Copy the rest of the backend application files
COPY backend/ .

# Build the backend application
RUN npm run build

# Build frontend ---------------------------
# Use the Node.js frontend image as the base image
FROM node:18.20.3 AS frontend-builder

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend application files
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend application files
COPY frontend/ .

# Build the frontend application
RUN npm run build

# Final stage ---------------------------
# Use a lightweight Node.js image for the final container
FROM node:18.20-alpine

# Set the working directory
WORKDIR /app

# Copy installed node modules for backend
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder /app/backend/package.json ./backend/package.json
COPY --from=backend-builder /app/backend/tsconfig.json ./backend/tsconfig.json
COPY --from=backend-builder /app/backend/sql-queries ./backend/sql-queries

# Copy the built backend files
COPY --from=backend-builder /app/backend/dist ./backend

# Copy the built frontend files
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/.next/standalone ./frontend
COPY --from=frontend-builder /app/frontend/.next/static ./frontend/.next/static

# Copy wait-for-it script
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh
RUN sed -i 's/\r//g' /app/wait-for-it.sh

COPY env-vars .env
COPY env-vars ./backend/.env

# Copy start script
COPY start.sh /app/start.sh

# Make start script executable
RUN chmod +x /app/start.sh

# Expose backend ports
EXPOSE 3001

# Expose backend ports
EXPOSE 3000
ENV PORT 3000

# Set the command to run the combined application
# CMD ["node", "backend/main.js"]
# CMD HOSTNAME="0.0.0.0" node frontend/server.js
CMD ["sh", "start.sh"]