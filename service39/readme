# MS39 – Digital Identity Integration Service

This microservice enables linking digital receipts to verified user identities (Aadhaar, UPI, NFC, eID, etc.) to support privacy compliance, digital consent, and identity-based features like warranties and personal vaults.

---

## 🔍 Purpose

- Link receipt to identity (Aadhaar, UPI, NFC, eIDAS)
- Store user consent for each identity usage
- Simulate tap-based NFC identity binding
- Prepare backend for DPDP compliance & EU eIDAS rollout

---

## 🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ODM)

Validation: Mongoose Schema Validation

Environment Config: dotenv

---

## 📁 Folder Structure

ms39-identity-service/
├── app.js
├── db.js
|
├── controllers/
│ └── identity.controller.js
├── models/
│ ├── identity.model.js
│ └── consent.model.js
├── routes/
│ └── identity.routes.js
├── services/
│ └── mockIdentity.service.js
├── package.json
└── README.md
---

1. ⚙️ Installation & Setup
Clone the repository
```bash
git clone <your_repo_url>
cd identity-consent-service

2. Install dependencies
```bash
  npm install

  3. Set up .env file
  PORT=3000
MONGO_URI=mongodb://localhost:27017/identity_service
NODE_ENV=development

4. Run the service
npm start

📡 API Endpoints
Identity
| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | `/api/identity`     | Create new identity record |
| GET    | `/api/identity/:id` | Get identity by ID         |
| GET    | `/api/identity`     | Get all identities         |
| PUT    | `/api/identity/:id` | Update identity            |
| DELETE | `/api/identity/:id` | Delete identity            |

Consent

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/api/consent`     | Create consent record |
| GET    | `/api/consent/:id` | Get consent by ID     |
| GET    | `/api/consent`     | Get all consents      |
| PUT    | `/api/consent/:id` | Update consent        |
| DELETE | `/api/consent/:id` | Delete consent        |


🚀 Features
Identity Management – Store and retrieve user KYC/identity details.

Consent Tracking – Record user consent with timestamps.

MongoDB Integration – Persistent data storage.

Error Handling Middleware – Clean, consistent error responses.

Environment Variables Support – Easy configuration with .env.


🧪 Testing with Postman
Import the provided Postman Collection (postman_collection.json).

Update the {{base_url}} environment variable to match your running server.

Test each endpoint with sample payloads.


🛡 Error Handling
All errors return JSON responses with:

{
  "success": false,
  "message": "Error description"
}

📜 License
This project is licensed under the MIT License.


Author
  Sumit Kumar
@Intern [TerraGridTech]
