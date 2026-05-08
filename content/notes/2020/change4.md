---
title: Git / Network
date: 2020-02-01  
---

# 1. GIT
>> sudo apt install git
>> git config --global user.email "name.surname@gmail.com"
>> git config --global user.name "Name Surname"


>> git push --set-upstream origin master --no-verify

# 2. Network

## Comando UNIX per vedere le porte in ascolto
>> netstat -natp | grep -i listen

# Unix command to verify how old wich port
>> sudo netstat -putan | grep 90
# Installa tool di rete
>> apt update && apt install -y net-tools
>> apt-get update && apt-get install -y iputils-ping

## Comando UNIX per vedere le porte in ascolto
>> netstat -natp | grep -i listen
# Unix command to verify how old wich port
>> sudo netstat -putan | grep 90


# Verifica host name
>> cat /etc/hosts|grep LXRT2-MACHINE-NAME

# Putty Conn
>> netstat anp | grep 1521

---

# 3. SSH Key 

# Generate ssh key 
ssh-keygen -t ed25519 -C "your_email@example.com"

# Start ssh agent
eval "$(ssh-agent -s)"

# Add ssh key to agent
ssh-add ~/.ssh/id_ed25519

# Show public key
cat ~/.ssh/id_ed25519.pub

# Copy ssh key into home directory
cp -r /mnt/c/Users/folder/.ssh ~/
chmod 600 ~/.ssh/id_ed25519

# Set env variables
sudo vi ~/.profile
export JAVA_HOME=/opt/jdk-17.0.8.1+1
export PATH=$PATH:$JAVA_HOME/bin