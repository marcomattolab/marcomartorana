---
title: Docker Commands
date: 2020-02-01  
---

# Comandi Docker
docker run busybox:latest echo 'Hello Docker'

docker run -it busybox
docker start
docker rm

#Eseguiamo Nginx
docker run -d nginx

docker image ls = docker images
docker ps
docker ps -a (all => vedo tutti i container anche not running)

# Per cercare le immagini docker
docker search nginx

Note: La RUN fa il Pull (mentre start no).

# Running container Apache httpd
docker run -d httpd
docker run -d -p 80 httpd
docker run -d -p 4000:80 httpd
docker run -d -p 4000:80 --name webserver --memory 400m --cpus 0.5 httpd

## Trucchi e/o comandi
docker top
docker exec -it sh <=> docker exec -it webserver /bin/bash

ip route ==> Vedi la tabella di routing
ip link ==> interfacce di rete
docker inspect nginx1 | grep -i ipaddress

## Prima fa partire il container e lo rimuove all exit del container
docker run --rm -it --name test-rm busybox

#Remove all containers
docker rm $(docker ps -aq)

# Inspect dei containers
docker inspect
docker inspect webserver

# Logs (follow rimane agganciato al log)
docker logs -f
docker logs -f webserver

# Docker top / port
docker top webserver
docker port webserver

docker run -d -p 80:80 --name webserver httpd
docker exec -it webserver /bin/bash

docker run busybox:latest --name test-rm
docker run --rm -it busybox

## Esempio lancio nginx
docker run --name nginx1 -d nginx
docker run --name nginx2 -d -p80:80 nginx

## Run Mysql
docker run mysql/mysql - server

## Salvare immagine in un TAR
docker image save mysql > /tmp/mysql.tar

# Creo Immagine da Dockerfile
docker build -t ubuntu-test:cmd .
docker run ubuntu-test
docker run ubuntu-test:cmd echo Ciao # (A-CMD) Sovrascrive il CMD ["echo", "Hello World"] => CMD ["echo", "Ciao"]

## Pulisce tutti i volumi
docker volume prune

## VOLUMI
docker volume create --name myvolume
docker volume inspect myvolume
docker volume ls

# NETWORK
brctl show
docker network list
ifconfig
docker network inspect bridge

# Check Ip Address docker
docker ps
docker inspect d423990928ee | grep "IPAddress"
docker image prune -af