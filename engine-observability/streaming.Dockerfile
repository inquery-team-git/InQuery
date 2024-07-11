FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/streaming

# Install psycopg2 dependencies
RUN apt-get update \
    && apt-get install -y libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

COPY streaming/ .
RUN pip3 install --no-cache-dir -r requirements.txt
RUN echo "Hello"

WORKDIR /app

COPY env-vars .env

# Copy start script
COPY streaming.start.sh /app/streaming.start.sh

# Make start script executable
RUN chmod +x /app/streaming.start.sh

# Copy wait-for-it script
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh
RUN sed -i 's/\r//g' /app/wait-for-it.sh

# Copy wait-for-trino script
COPY wait-for-trino.sh /app/wait-for-trino.sh
RUN chmod +x /app/wait-for-trino.sh
RUN sed -i 's/\r//g' /app/wait-for-trino.sh

# Expose ports
EXPOSE 3003
CMD ["sh", "streaming.start.sh"]