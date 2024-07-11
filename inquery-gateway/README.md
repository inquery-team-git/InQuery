# Introduction
The InQuery Trino gateway is an extension to the open source Trino gateway project. It allows users to use a lightweight model to predict the CPU time a query would take and reference that prediction time in the routing rules. This project includes a dummy  model that only uses the number of characters of a query to predict whether it is small or large. We advise users to fit a more robust model based on their historical data to ensure optimal results.

# Docs
[Trino Gateway docs](https://trinodb.github.io/trino-gateway/)

# To run locally
```
./mvnw clean install (this will create necessary JAR files in gateway-ha/target/)
cd docker
./build.sh -a (arm64, amd64, ppc64le)
export TRINO_GATEWAY_IMAGE="trino-gateway:9-SNAPSHOT-amd64"
docker compose up --wait
```

# Helm


```
cd helm/trino-gateway
edit routing-rules.yaml
kubectl create cm routing-rules --from-file routing-rules.yaml
helm install
```

If using a custom predictor image, make sure to change the inqueryPredictor image repository in the values.yaml.
