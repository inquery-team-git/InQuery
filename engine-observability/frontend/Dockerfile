# Build frontend ---------------------------
# Use the Node.js frontend image as the base image
FROM node:18.20.3 AS frontend-builder

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend application files
COPY /package*.json ./
RUN npm install

# Copy the rest of the frontend application files
COPY . .

# Build the frontend application
RUN npm run build

# Final stage ---------------------------
# Use a lightweight Node.js image for the final container
FROM node:18.20-alpine

# Set the working directory
WORKDIR /app

# Copy the built frontend files
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/.next/standalone ./frontend
COPY --from=frontend-builder /app/frontend/.next/static ./frontend/.next/static

# Copy start script
COPY start.sh /app/start.sh

# Make start script executable
RUN chmod +x /app/start.sh

# Expose frontend ports
EXPOSE 3000
ENV PORT 3000

# Set the command to run the combined application
CMD ["sh", "start.sh"]