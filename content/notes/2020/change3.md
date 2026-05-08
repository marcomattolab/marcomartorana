---
title: Docker Commands
description: "Essential Docker commands: containers, images, networking, volumes, and Dockerfile builds."
date: 2020-02-01
---

# Docker Cheat Sheet

## Basic Commands

```bash
docker run busybox:latest echo 'Hello Docker'
docker run -it busybox
docker start
docker rm
```

**Note:** `run` does a pull automatically; `start` does not.

## Running Containers

```bash
# Nginx
docker run -d nginx

# Apache httpd with port/resource limits
docker run -d -p 80 httpd
docker run -d -p 4000:80 httpd
docker run -d -p 4000:80 --name webserver --memory 400m --cpus 0.5 httpd

# Nginx examples
docker run --name nginx1 -d nginx
docker run --name nginx2 -d -p 80:80 nginx
```

## Images & Search

```bash
docker image ls          # same as: docker images
docker search nginx
docker image save mysql > /tmp/mysql.tar
docker image prune -af
```

## Container Management

```bash
docker ps                # running containers
docker ps -a             # all containers

# Remove all containers
docker rm $(docker ps -aq)

# Inspect & logs
docker inspect webserver
docker logs -f webserver

# Top & port
docker top webserver
docker port webserver
```

## Exec & Shell

```bash
docker exec -it webserver /bin/bash
docker exec -it sh       # same as above
```

## Networking

```bash
brctl show
docker network ls
docker network inspect bridge
ifconfig

# Get container IP
docker inspect <container_id> | grep "IPAddress"
```

## Volumes

```bash
docker volume create --name myvolume
docker volume inspect myvolume
docker volume ls
docker volume prune      # clean up unused volumes
```

## Build & Run from Dockerfile

```bash
docker build -t ubuntu-test:cmd .
docker run ubuntu-test
docker run ubuntu-test:cmd echo Ciao   # overrides CMD
```

## Run with Auto-Remove

```bash
docker run --rm -it --name test-rm busybox
```

## MySQL

```bash
docker run mysql/mysql-server
```