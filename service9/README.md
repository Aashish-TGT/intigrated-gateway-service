# 📟 Digital Receipt Microservice + API Gateway

This project is part of a scalable microservices architecture designed to generate and manage digital receipts in PDF format with embedded QR codes. It includes an **API Gateway** for secure access control, request validation, and rate limiting.

---

## 📁 Folder Structure

```
API-GATEWAY/
├── receipt-gateway/     # Express Gateway configuration
├── receipt-service/     # Receipt generation microservice
├── .gitignore
└── README.md
```

---

## 🚀 Services Overview

### 1. `receipt-service` (Microservice)

A Node.js service that:

- Accepts receipt data via `POST` request
- Generates a PDF receipt with an embedded QR code
- Returns the PDF as a downloadable file

**📦 Expected Payload:**

```json
{
  "customerName": "Suraj",
  "items": ["USB Cable", "Notebook"],
  "totalAmount": 299.50
}
```

**▶ To run locally:**

```bash
cd receipt-service
npm install
node receipt-service.js
```

---

### 2. `receipt-gateway` (API Gateway)

An Express Gateway service that:

- Routes and proxies API requests
- Enforces rate limiting (5 requests/minute per IP)
- Provides a single point of entry for external clients

**📬 Route Configured:**

```
POST /v1/receipt
```

**▶ To run locally:**

```bash
cd receipt-gateway
npm install
npm start
```

---

## 🔐 Key Features

👉 API Gateway routing via Express Gateway  
👉 Rate limiting (throttling) to prevent abuse  
👉 Request schema validation via middleware  
👉 PDF receipt generation with embedded QR code  
👉 Clean, modular microservices structure  
👉 Postman- and client-friendly RESTful API

---

## 🔗 Sample API Request

**POST** `http://localhost:8080/v1/receipt`

**Request Body:**

```json
{
  "customerName": "Suraj",
  "items": ["USB Cable", "Notebook"],
  "totalAmount": 299.50
}
```

**Response:** PDF file (receipt) downloaded directly

---

## 📈 Future Enhancements

- 🔐 Add API Key or JWT authentication
- 🐳 Dockerize all services using `docker-compose`
- ☁ Deploy to Railway, Render, or Azure
- 📘 Add Swagger/OpenAPI 3.0 documentation
- 🧪 Add unit and integration tests with CI/CD

---

## ✅ Git Setup & Push

Once configured locally, use the following Git commands:

```bash
git add .
git commit -m "Initial commit: Gateway and Receipt service setup"
git push -u origin main
```

---

## 👨‍💻 Built with ❤️ by Suraj & Team
