# ⚙️ Smart IoT Device Compatibility Service

A Node.js-based service that connects smart devices (like EV chargers, kiosks, or fuel dispensers) to a backend system using MQTT and WebSocket. It supports device authorization, transaction generation, and real-time dashboard updates.

---

## 🚀 Purpose

- Bridge data from smart IoT devices to cloud services
- Format and push transaction data in real-time
- Provide a live dashboard using WebSocket
- Built for EV-first, tolling, and automated commerce systems

---

## 🧱 Tech Stack

- **Node.js** (Express.js)
- **MQTT** (via `mqtt` package)
- **WebSocket** (via `ws`)
- **In-memory DB** (simulated using arrays)
- **Dashboard** (Vanilla HTML + WebSocket)

---

## 📁 Project Structure
smart-iot-device-service/
├── controllers/ # Device & transaction handlers
├── routes/ # API routes
├── services/ # MQTT subscriber service
├── utils/ # Auth middleware
├── models/ # Simulated in-memory database
├── public/ # WebSocket-enabled dashboard
├── scripts/ # Mock EV data publisher
├── .env # Config values (port, token, etc.)
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── server.js


---

## 📦 Installation

```bash
git clone https://github.com/sumit-TGT/smart-iot-device-service.git
cd smart-iot-device-service
npm install

⚙️ Environment Variables
Create a .env file in the root:

PORT=3000
API_TOKEN=securetoken123
MQTT_BROKER=mqtt://broker.hivemq.com

🧪 Running the Project
Start the backend + dashboard:

 npm start
 Open: http://localhost:3000/dashboard.html

 Run mock EV charger publisher:

  npm run mock:ev
It sends random EV charging transactions to the MQTT topic ev/charger/transactions.

📊 Features
✅ Device authorization endpoint (/api/devices/authorize)

✅ Transaction generation endpoint (/api/transactions)

✅ MQTT Subscriber: listens for EV charger data

✅ WebSocket Dashboard: see live receipts appear instantly

✅ Custom fields like mileage, meter, and unit


🔐 API Auth
All POST/GET to /api/* routes require this header:
Authorization: securetoken123


🧑‍💻 Author
Sumit Kumar
[Terra Grid Tech]











