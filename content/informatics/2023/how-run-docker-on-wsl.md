---
Title: Run Web App with Docker on WSL
Subtitle: ""
Date: 2023-02-02
Tags: ["informatics"]
image : "/img/collections/collections8.png"
Description: How to Run Your Web App Seamlessly with Docker on Windows & WSL
Draft: 
---


# 🚀 Run Your Web App with Docker – RoadMasters Guide

Running your web app in Docker is now easier than ever! Here’s a quick guide to get started.

---

## **Prerequisites**
- Install Docker
- **Windows Users:** Install Docker Desktop and WSL with Ubuntu

👉 [Get started with Docker containers on WSL](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers)  
👉 [Install Ubuntu on Windows 10 WSL without Microsoft Store](https://stackoverflow.com/questions/52512026/is-it-possible-install-ubuntu-in-windows-10-wsl-without-microsoft-store)  

---

## **Fix VPN Issues**
If you're using Cisco AnyConnect, follow this [WSL 2 Cisco AnyConnect Networking Workaround](https://gist.github.com/balmeida-nokia/122adf625c11c916902950e3255bd104).

**Steps:**
1. Connect to the VPN.
2. Open PowerShell as Administrator and run:
   ```powershell
   Get-NetAdapter | Where-Object {$_.InterfaceDescription -Match "Cisco AnyConnect"} | Set-NetIPInterface -InterfaceMetric 6000
   ping 8.8.8.8
   (Get-NetAdapter | Where-Object InterfaceDescription -like "Cisco AnyConnect*" | Get-DnsClientServerAddress).ServerAddresses
   ```
3. Update `/etc/resolv.conf` in Ubuntu:
   ```
   nameserver 10.10.0.124
   nameserver 10.10.0.132
   ```

---

## **Clone the Project**
For Windows:
```bash
git clone git...
git config --global core.autocrlf false
```

---

## **Environment Setup**
From the `docker` folder:
- Copy `.env.example` → `.env`
- Copy `docker-compose.override.example.yml` → `docker-compose.override.yml`
- Copy `dev_tools/php-override.example.ini` → `dev_tools/php-override.ini`
- Copy `php/php-override.example.ini` → `php/php-override.ini`

---

## **Run the App**
```bash
docker compose up -d
```

**Tip:** If pulling fails on Windows, pull base images one by one.

---

Ready to containerize your app? Start now!