# 🛡️ Audit & Compliance Service

A microservice that captures and stores user actions for legal and regulatory compliance using **Kafka**, **Azure CosmosDB**, and **Node.js**. It supports **GDPR-compliant logs**, **timestamped audit trails**, and **exportable reports** in CSV and PDF format.

---

## 📌 Features

- ✅ GDPR-compliant immutable audit logs
- 🕓 Timestamped user actions
- 📁 Export data as CSV or PDF
- 🔍 Filter audit logs by `userId`
- ⚙️ Built on Kafka + CosmosDB + Express.js

---

## 🔧 Tech Stack

| Tool         | Use                          |
|--------------|-------------------------------|
| Kafka        | Event streaming               |
| CosmosDB     | Document database             |
| Express.js   | REST API                      |
| json2csv     | CSV export                    |
| pdfkit       | PDF generation                |
| dotenv       | Environment configuration     |

---

## 📂 Project Structure

```
audit-compliance/
├── kafka/             # Kafka producer and consumer
├── cosmos/            # Cosmos DB client
├── routes/            # Express API routes
├── exports/           # CSV and PDF export functions
├── .env               # Environment variables
├── server.js          # Entry point
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. 📥 Clone the repository

```bash
git clone https://github.com/your-username/audit-compliance.git
cd audit-compliance
```

### 2. 📦 Install dependencies

```bash
npm install
```

### 3. 🛠️ Configure environment

Create a `.env` file:

```env
KAFKA_BROKER=localhost:9092
COSMOS_ENDPOINT=your_cosmosdb_url
COSMOS_KEY=your_cosmosdb_key
COSMOS_DATABASE=AuditDB
COSMOS_CONTAINER=Events
```

### 4. 🚀 Start the service

```bash
npm start
```

Kafka consumer will start and REST APIs will be available on **http://localhost:3000**.

---

## 📡 API Endpoints

### `GET /audit/events`

**Query Params:**
- `userId` (optional): Filter by user
- `exportType` (optional): `csv` or `pdf`

**Examples:**

- Fetch all logs:
  ```
  GET /audit/events
  ```

- Filter by user:
  ```
  GET /audit/events?userId=123
  ```

- Export as CSV:
  ```
  GET /audit/events?exportType=csv
  ```

- Export as PDF:
  ```
  GET /audit/events?exportType=pdf
  ```

---

## 📤 Sending Audit Events

Use the Kafka producer (`producer.js`) to emit events:

```js
sendAuditEvent({
  userId: "123",
  action: "LOGIN",
  description: "User logged in"
});
```

Each event is automatically timestamped and stored in CosmosDB.

---

## 📃 License

MIT License

---

## 🙋‍♂️ Author

Made with ❤️ by **Sumit**  
Intern at Tera Grid Tech | Node.js | Kafka | CosmosDB
