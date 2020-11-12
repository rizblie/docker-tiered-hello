# docker-tiered-hello

This repo includes source for two docker images, `docker-hello-web` and `docker-hello-backend`.

These docker images can be used in demos that require a two-tier application as follows:

* `docker-hello-backend` provides a REST API that offers a single end-point that can be used to retrieve a JSON object.

* `docker-hello-web` provides a web server that invokes the backend REST API and uses the JSON response to construct an HTML response.

Both services are implemented using Node.js

## How to build

### Pre-requisites and build setup

Install Node.js

Access to a docker registry

### docker-hello-backend



### docker-hello-web


## Runtime options
