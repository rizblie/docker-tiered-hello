#!/bin/sh

repo=wizriz/hello-web

docker tag hello-web:latest $repo:latest
docker push $repo:latest
