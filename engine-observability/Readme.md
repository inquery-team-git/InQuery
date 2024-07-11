<p align="center">
    <img alt="InQuery Logo" src="../.github/inquery_white.svg" />
</p>

<p align="center">
    <b>InQuery helps you build your lake house by simplifying your platform’s operational challenges so that your team can focus on deriving value from your data.</b>
</p>

---
### Demo
[http://inquery-demo.com](http://inquery-demo.com)

---
## Running InQuery App

InQuery offers various configuration options for running the engine observability application. The Engine Observability option requires a connection to a database with live query logs from either the MySQL or or http event listener plug-ins. Depending on your requirements and setup, you can choose one of the following options:

### Pre-Hosted Database with Trino Cluster (Cloud):

- These instructions assume you are hosting your own Trino cluster and database in the cloud. Running the application with a pre-hosted Database and Trino Cluster in the cloud? No problem! [Check out the instructions provided in this guide](docs/inquery-app-cloud.md).

    ### Database Supports
    - PostgreSQL
    - MySQL

### Dockerized Database with Dockerized Trino Cluster (Local):

- For a local setup, where both the Database and Trino Cluster are Dockerized, [refer to this guide for detailed steps](docs/inquery-app-local.md).

    ### Database Supports
    - PostgreSQL

Choose the setup that best fits your needs and start exploring InQuery App!

For support setting up the application with your own hosted Trino cluster, feel free to reach out to founders@inquery-data.com
