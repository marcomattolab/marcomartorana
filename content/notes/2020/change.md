---
title: Java & Tomcat Cheatsheet
description: Java environment setup, Tomcat service commands, logs management, and manual startup/shutdown procedures.
date: 2020-02-01
---

# Java & Tomcat Cheatsheet

## Java ENV Setup

```bash
cd
vi .bashrc
```

Add:

```bash
export JAVA_HOME=/ltm/rt/java/jdk1.7.0_40
export GP_HOME=/ltm/rt/gtech/gp
export GP_MEM_OPTS='-Xmx2048m -Xms2048m -XX:MaxPermSize=512m'
```

Reload bash:

```bash
source .bashrc
```

---

## Check Java Process

```bash
ps -eaf | grep java
```

---

# Tomcat

## Service Commands

```bash
service tomcat8 stop
service tomcat8 start
```

## Logs

```bash
cd /storage/apache-tomcat-8.0.43/logs
tail -Fn200 catalina.out
```

## Edit Context

```bash
vi /storage/apache-tomcat-8.0.43/webapps/ossc-web/META-INF/context.xml
```

---

## Manual Startup / Shutdown

### Configure `CATALINA_OPTS`

```bash
vi .bashrc
```

Add:

```bash
export CATALINA_OPTS="-Dbmt.config.file=/ltm/rt/tomcat/apache-tomcat-7.0.41/conf/bmt-web.properties \
-Dcom.sun.xml.ws.transport.http.client.HttpTransportPipe.dump=true \
-Dcom.sun.xml.internal.ws.transport.http.client.HttpTransportPipe.dump=true \
-Dcom.sun.xml.ws.transport.http.HttpAdapter.dump=true \
-Dcom.sun.xml.internal.ws.transport.http.HttpAdapter.dump=true"
```

Reload:

```bash
source .bashrc
```

### Start Tomcat

```bash
cd TOMCAT_BIN
./startup.sh
```

### Stop Tomcat

```bash
ps -ef | grep catalina
cd TOMCAT_BIN
./shutdown.sh
```

---

# Logs & Cleanup

## Remove `.bak` Files

```bash
find . -type f -name "*.bak" -exec rm {} \;
```

## Find Large Files

```bash
find . -size +20M -ls
find . -type f -size +1k -not -iname "*2015*"
```

## Remove Temp Folders

```bash
rm -rf data/ tmp/ work/
```

## Remove Specific Log

```bash
rm -f server.log
```

## Remove Logs by Pattern

```bash
sudo rm *log.201*
```
