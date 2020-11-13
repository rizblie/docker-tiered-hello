#!/bin/sh

repo=wizriz/hello-backend

docker tag hello-backend:latest $repo:latest
docker push $repo:latest
