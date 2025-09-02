# 🩺 Health & Monitoring Service

This service monitors the health of microservices by exposing a heartbeat API and visualizing metrics using Prometheus and Grafana. Ideal for DevOps teams to track uptime, memory usage, and CPU load in real-time.

---

## 📌 Purpose

- Tracks **uptime**, **memory usage**, and **error rates** of services
- Helps detect outages early through **alert triggers**
- Provides a **dashboard view** of system performance

---

## 🧰 Tech Stack

- **Node.js** – for exposing `/health` endpoint
- **Prometheus** – for metrics scraping and storage
- **Grafana** – for visual dashboards and alerting
- **Docker Compose** – to manage services
- **Azure Monitor (optional)** – for production-level alerting

---

## 🗂️ Project Structure

health-src/
├── health-monitoring/
│   └── server.js
├── prometheus.yml
├── docker-compose.yml
├── README.md
├── LICENSE
└── .gitignore




---

## ⚙️ Setup Instructions

### 1️⃣ Run Node.js Health Service

```bash
cd health-monitoring
npm init -y
npm install express
node server.js

Access it at: http://localhost:3000/health

2️⃣ Start Prometheus + Grafana via Docker
cd ..
docker-compose up -d

Prometheus: http://localhost:9090

Grafana: http://localhost:3000
Default login: admin / admin123


📊 Configure Grafana
1. Go to Settings > Data Sources

2. Add Prometheus:
http://prometheus:9090

3. Create dashboard panels with queries like:

up

process_resident_memory_bytes

process_cpu_seconds_total

🚨 Optional: Azure Monitor Alerts (for production)
In Azure:

Go to Monitor > Alerts > Create Alert Rule

Select your App Service or VM

Set condition: e.g., memory > 400 MB

Set action: email/SMS/webhook


👨‍💻 Author
  **Sumit**
 Terragrid Tech









