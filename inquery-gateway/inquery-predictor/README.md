# Docker hub container
[Docker hub repository](https://hub.docker.com/repository/docker/inquerydata/inquery-predictor/general)

# API endpoints

- **GET /health**: Endpoint to check the health of the service.
- **POST /predict**: Endpoint to make predictions.
___


# Development
```
python app.py
```

# Production
```
docker compose up -d
```
# Testing

To test the predict endpoint, you can use the following curl command to get back the predicted CPU time in seconds:

```
curl --request POST \
  --url 'http://127.0.0.1:5001/predict?=' \
  --header 'Content-Type: text/plain' \
  --header 'X-Trino-Catalog: iceberg' \
  --header 'X-Trino-Schema: postgres_rds_public' \
  --header 'X-Trino-Source: trino' \
  --header 'X-Trino-User: trino' \
  --data 'show tables'
```

