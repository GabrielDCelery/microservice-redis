# What is this project for?

This is a Dockerized Reis Microservice

## Run development environment

To start a dev environment run

```
make run-dev
```

The above command will do the followings:

1. Builds the Docker dev image
2. Starts running containers

| Containers                   | What is it running | What is it for                                         | Port |
| ---------------------------- | ------------------ | ------------------------------------------------------ | ---- |
| microservice_redis           | Redis              | Redis container                                        | 6379 |
| microservice_redis_connector | NodeJs express     | Exposing API endpoints for connecting to Redis service | 8088 |

If the containers are running properly you can access the frontend at `http://localhost:8088`.

## Rebuild development environment

If you got redundant docker containers and images on your local machines you can use the following commands to remove those images and start the dev server

```
make run-clean-dev
```

## Running tests

In order to run tests after starting the devlopment server run the following:

```
make run-test
```
