---
title: Git / Network
description: "Git configuration basics, network port checking commands, and SSH key generation and setup."
date: 2020-02-01
---

# Git / Network Cheat Sheet

## Git Configuration

```bash
# Install Git
sudo apt install git

# Configure user
git config --global user.email "name.surname@gmail.com"
git config --global user.name "Name Surname"
```

## Git Push

```bash
# Push and set upstream branch
git push --set-upstream origin master --no-verify
```

## Network Commands

### Check Listening Ports

```bash
# Show listening ports
netstat -natp | grep -i listen
```

### Verify Specific Port Usage

```bash
# Check processes using a specific port (example: 90)
sudo netstat -putan | grep 90

# Example for Oracle DB port (1521)
netstat anp | grep 1521
```

### Install Network Tools

```bash
apt update && apt install -y net-tools
apt-get update && apt-get install -y iputils-ping
```

### Verify Hostname

```bash
cat /etc/hosts | grep LXRT2-MACHINE-NAME
```

**Note:** `net-tools` provides utilities such as `netstat`, while `iputils-ping` installs the `ping` command.

## SSH Key Setup

### Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Start SSH Agent

```bash
eval "$(ssh-agent -s)"
```

### Add SSH Key to Agent

```bash
ssh-add ~/.ssh/id_ed25519
```

### Show Public Key

```bash
cat ~/.ssh/id_ed25519.pub
```

### Copy SSH Key from Windows Home Directory

```bash
cp -r /mnt/c/Users/folder/.ssh ~/
chmod 600 ~/.ssh/id_ed25519
```

## Environment Variables

```bash
# Edit profile
sudo vi ~/.profile

# Java environment variables
export JAVA_HOME=/opt/jdk-21.0.1
export PATH=$PATH:$JAVA_HOME/bin
```