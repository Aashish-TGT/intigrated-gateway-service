# 📦 Business Sync Service

The **Business Sync Service** is a Node.js-based microservice designed to capture receipt data and synchronize it across accounting platforms like **QuickBooks**, **Zoho**, and **Tally**.

---

## 🚀 Features

- ✅ Create and store receipts in MongoDB
- 🔁 Sync receipts to QuickBooks, Zoho, or Tally (mocked)
- 🔒 Input validation with `express-validator`
- 🧱 Modular service architecture
- ⚙️ Centralized error handling

---

## 🛠️ Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- REST API design
- OAuth2 (planned for Zoho & QuickBooks)
- XML over HTTP (planned for Tally)

---

## 📂 Folder Structure

```
Microservice7-SyncReciept-main/
├── app.js
├── .env
├── routes/
│ └── receipt.routes.js
├── controllers/
│ └── receipt.controller.js
├── services/
│ ├── syncQuickBooks.js
│ ├── syncZoho.js
│ └── syncTally.js
├── middleware/
│ └── errorHandler.js
├── models/
│ └── receipt.model.js
├── utils/
│ └── mapper.js
└── README.md



---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash

git clone https://github.com/your-username/business-sync-service.git
cd business-sync-service


### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file:

PORT=3000
MONGO_URI=mongodb://localhost:27017/receipt-service
NODE_ENV=development


▶️ Running the Service
Make sure MongoDB is running locally, then start the server:
```bash

npm start
You can now access the API at:

http://localhost:3000/api/receipts


🔁 API Endpoints
| Method | Endpoint                 | Description                            |
| ------ | ------------------------ | -------------------------------------- |
| POST   | `/api/receipts`          | Create a new receipt                   |
| GET    | `/api/receipts/:id`      | Retrieve receipt by ID                 |
| POST   | `/api/receipts/:id/sync` | Sync the receipt to the given platform |


📥 Sample Receipt Payload
```json

{
  "platform": "quickbooks",
  "amount": 1500,
  "date": "2025-08-02",
  "customer": "John Doe",
  "items": [
    { "name": "Product A", "qty": 2, "price": 750 }
  ]
}


### 🔄 Sync Receipt

```
POST /api/receipts/:id/sync
```

Syncs the selected receipt to the specified platform.

### 🔍 Get Receipt

```
GET /api/receipts/:id
```

Returns the receipt details including sync status.

---

## 🧩 Example Receipt Object

```json
{
  "_id": "664d2487c7a9fa7f7c123456",
  "vendor": "Amazon",
  "amount": 2500,
  "date": "2025-06-19T00:00:00.000Z",
  "tags": ["electronics"],
  "platform": "zoho",
  "status": "pending",
  "metadata": {
    "invoice_no": "AMZ123",
    "payment_method": "credit card"
  }
}
```

---

## 📌 To-Do / Roadmap

- [ ] Add authentication (JWT)
- [ ] Add webhook support
- [ ] Background sync using BullMQ
- [ ] Sync logs UI (React dashboard)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## Author ##
Sumit Kumar
@Intern[TGT]
