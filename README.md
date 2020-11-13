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

hello-backend
```
Options:
  -V, --version              output the version number
  -p, --port <port>          server port (default: "80")
  -g, --greeting <greeting>  greeting (default: "Hello")
  -m, --message <message>    message (default: "Welcome to our world!")
  -h, --help                 output usage information
```

hello-web
```
Options:
  -V, --version        output the version number
  -b, --backend <uri>  uri of backend service
  -p, --port <port>    server port (default: "80")
  -h, --help           output usage information
```

## Example usage

```
docker run --name backend -d hello-backend
backend=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' backend)
docker run --name web -p 8080:80 hello-web node server.js --backend http://${backend}/data
```

cleanup
```
docker kill web backend
docker rm web backend
```
