---
title: Developer Utilities
description: "Developer Utilities: git, unix, java, ssh, port, curl, and more."
date: 2020-02-01
---
In the following there are a lot of Developer Utilities.

### Process Management

```bash
# Show running processes
ps aux

# Find process by name
ps aux | grep java
ps aux | grep node

# Kill process by PID
kill -9 <PID>

# Monitor system processes
top
htop
```

### Port Debugging

```bash
# Check which process is using a port
sudo lsof -i :8080

# Alternative with ss
sudo ss -tulnp | grep 8080

# Kill process using a port
sudo kill -9 $(sudo lsof -t -i:8080)
```

### Disk & File System

```bash
# Show disk usage
df -h

# Show folder size
du -sh *

# Show current folder size
du -sh .

# Find large files
find . -type f -size +100M
```

### File Permissions

```bash
# Make script executable
chmod +x script.sh

# Change owner
sudo chown -R user:user folder/

# Change permissions recursively
chmod -R 755 folder/
```

### Search & Logs

```bash
# Search text inside files
grep -Ri "search-text" .

# Tail logs in real time
tail -f app.log

# Last 100 lines
tail -100 app.log

# View logs with paging
less app.log
```

### SSH & Remote Access

```bash
# SSH connection
ssh user@server-ip

# SSH with private key
ssh -i ~/.ssh/id_ed25519 user@server-ip

# Copy file to remote server
scp file.txt user@server:/path/

# Copy folder to remote server
scp -r folder user@server:/path/
```

### Curl / API Testing

```bash
# Simple GET request
curl http://localhost:8080

# GET with headers
curl -H "Authorization: Bearer TOKEN" http://localhost:8080/api

# POST JSON request
curl -X POST http://localhost:8080/api \
-H "Content-Type: application/json" \
-d '{"name":"test"}'
```

### Environment Variables

```bash
# Show env variables
printenv

# Show specific variable
echo $JAVA_HOME

# Reload shell config
source ~/.profile
source ~/.bashrc
```

### Java / Maven

```bash
# Check Java version
java -version

# Check JAVA_HOME
echo $JAVA_HOME

# Maven build
mvn clean install

# Skip tests
mvn clean install -DskipTests
```

### Node.js / NPM

```bash
# Install dependencies
npm install

# Start project
npm start

# Run dev mode
npm run dev

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Git Utilities

```bash
# Current branch
git branch

# Show remote URLs
git remote -v

# Pull latest changes
git pull

# Clone repository
git clone <repo-url>

# Git status
git status

# Commit changes
git add .
git commit -m "message"

# View commit history
git log --oneline
```

### Useful System Commands

```bash
# Current user
whoami

# Current path
pwd

# Show Linux version
uname -a

# Show memory usage
free -h

# Check IP address
ip a

# Ping host
ping google.com
```

**Note:** `lsof`, `ss`, `tail -f`, `curl`, and `grep` are among the most useful commands for debugging APIs, services, logs, and networking in day-to-day development.