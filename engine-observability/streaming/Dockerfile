FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install psycopg2 dependencies
RUN apt-get update \
    && apt-get install -y libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

COPY . .
RUN pip3 install --no-cache-dir -r requirements.txt
RUN echo "Hello"

# Copy wait-for-it script
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh
RUN sed -i 's/\r//g' /app/wait-for-it.sh

# Copy start script
COPY start.sh /app/start.sh

# Make start script executable
RUN chmod +x /app/start.sh

# Expose ports
EXPOSE 3003
CMD ["sh", "start.sh"]