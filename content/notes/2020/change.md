---
title: Java
date: 2020-02-01 
---


# 1. Java -> Set env variables	

## SET ENVS VARIABLES
cd
vi .bashrc

# Insert these 3 env variables
JAVA_HOME=/ltm/rt/java/jdk1.7.0_40
GP_HOME=/ltm/rt/gtech/gp
GP_MEM_OPTS='-Xmx2048m -Xms2048m -XX:MaxPermSize=512m'

# RELOAD BASH
source .bashrc

---

# 2. Java -> Check Java Version 

# CHECK JAVA VERSION
ps -eaf | grep java	

---

# 3. Java -> Tomcat Commands

## Tomcat commands:
ps -eaf | grep java
service tomcat8 stop
cd /storage/apache-tomcat-8.0.43/logs
tail -Fn200 /storage/apache-tomcat-8.0.43/logs/catalina.out
service tomcat8 start
vi /storage/apache-tomcat-8.0.43/webapps/ossc-web/META-INF/context.xml

---

# 4. Linux -> Find and remove logs

# Cerca e Rimuove i file con estensione .bak eseguendo il comando rm tante volte quante sono i file trovati
find . -type f -name "*.bak" -exec rm {} ;

# REMOVE LOGS FILES
ls -larht|grep G
find . -size +20M -ls
find . -type f -size +1k -not -iname "*2015*"


# REMOVE TEMP FOLDERS
rm -rf data/ tmp/ work/

# REMOVE THE FILE 'server.log'
rm -f server.log

# REMOVE WITH PATTERN
sudo rm *log.201*

# FIND LOGS FILES
find . -size +20M -ls
find . -type f -size +1k -not -iname "*2015*"


# 5. Tomcat -> start and stop

# Edit the Tomcat/conf/bmt-web.properties file

# Editare il file bashrc inserendo le seguenti righe :
vi .bashrc
export CATALINA_OPTS="-Dbmt.config.file=/ltm/rt/tomcat/apache-tomcat-7.0.41/conf/bmt-web.properties -Dcom.sun.xml.ws.transport.http.client.HttpTransportPipe.dump=true -Dcom.sun.xml.internal.ws.transport.http.client.HttpTransportPipe.dump=true -Dcom.sun.xml.ws.transport.http.HttpAdapter.dump=true -Dcom.sun.xml.internal.ws.transport.http.HttpAdapter.dump=true"

# RICARICARE BASH
source .bashrc

# Start of Tomcat :
cd TOMCAT_BIN
./startup.sh

# Stop catalina
ps -ef | grep catalina
cd TOMCAT_BIN
./shutdown.sh