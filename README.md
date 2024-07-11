<p align="center">
    <img alt="InQuery Logo" src=".github/inquery_white.svg" />
</p>

<p align="center">
    <b>Trino Observability and Traffic Management</b>
</p>

# InQuery

InQuery is a collection of products and tools for optimizing your lakehouse querying performance, starting with your Trino deployment. 

This repo includes two core projects:

## Engine Observability
InQuery's Engine Observability tool enables Trino platform developers to monitor active and historical traffic in their Trino clusters with a finer level of granularity compared to the open source Trino UI. 

Key features include:

Cluster resource utilization
Cluster -> coordinator -> worker drill down
User/source/table usage patterns
Active query metrics

This platform was designed to make it easier to debug, tune, and optimize Trino deployments at your organization.

### Video Demo 
[https://www.youtube.com/watch?v=rHSMEXA6Mjs]

## Trino Predictive Gateway
The InQuery Gateway is an intelligent reverse proxy that forwards requests to Trino clusters according to predicted resource usage based on historical query patterns local to your system.

### Video Demo
[https://youtu.be/Pl-iCdDkKdU?si=KQrWS-D8AbpFYES]

## Usage
To start using InQuery's tools, refer to the specific project documentation within the repository.

## Contributing
We welcome contributions to improve InQuery. To contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Create a new Pull Request.

## License
This project is licensed under the MIT License.

## Contact 
For support or inquiries, please contact us at founders@inquery-data.com


