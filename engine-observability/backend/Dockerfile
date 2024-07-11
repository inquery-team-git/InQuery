# Build backend ---------------------------
# Use the Node.js backend image as the base image
FROM node:18.20.3 AS backend-builder

RUN npm i -g @nestjs/cli typescript ts-node

# Set the working directory for the backend
WORKDIR /app/backend

# Copy the backend application files
COPY /package*.json ./
COPY /src/sql-queries ./sql-queries
COPY /.env ./
RUN npm i

# Copy the rest of the backend application files
COPY . .

# Build the backend application
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
COPY --from=backend-builder /app/backend/.env ./backend/
COPY --from=backend-builder /app/backend/.env ./
COPY --from=backend-builder /app/backend/dist ./backend

# Copy wait-for-it script
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh
RUN sed -i 's/\r//g' /app/wait-for-it.sh

# Copy start script
COPY start.sh /app/start.sh

# Make start script executable
RUN chmod +x /app/start.sh

# Expose backend ports
EXPOSE 3001

CMD ["sh", "start.sh"]