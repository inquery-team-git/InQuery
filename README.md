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
InQuery's Engine Observability tool enables Trino platform developers to monitor active and historical traffic in their Trino clusters with a finer level of granularity compared to the open source Trino UI. Some of these features include cluster resource utilization, cluster -> coordinator -> worker drill down, user/source/table usage patterns, and active query metrics. This platform was designed to make it easier to debug, tune, and optimize Trino deployments at your organization.

Check out our live demo
[here](http://inquery-demo.com/admin/cluster/):

## Trino Predictive Gateway
The InQuery Gateway is an intelligent reverse proxy that forwards requests to Trino clusters according to predicted resource usage based on historical query patterns local to your system.

Check out our video demo here:

[https://youtu.be/Pl-iCdDkKdU?si=KQrWS-D8AbpFYES_]


