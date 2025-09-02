📁 backend/README.md
md
Copy
Edit

# 🔐 Consent Service Backend – MS43

This is the backend microservice for **Consent-backed Data Exchange (MS43)**. It securely generates, stores, and audits digital consent for sharing receipts with approved third parties.

---

## 🚀 Tech Stack

- Node.js + Express.js
- JWT (for consent tokenization)
- JSON-based mock logging (no real DB)
- In-memory data + JSON files

---

## 📁 Project Structure

backend/
├── index.js # Express server
├── accessLogs.json # Audit log for access
├── consentLogs.json # Log for consent tokens
└── package.json

yaml
Copy
Edit

---

## ⚙️ How to Run

```bash
cd backend
npm install
node index.js
📍 Runs at: http://localhost:3000

🧪 API Endpoints
✅ POST /api/consent
Purpose: Create a consent token (JWT)

json
Copy
Edit
{
  "userId": "user_123",
  "receiptId": "receipt_001",
  "thirdParty": "HDFC Bank",
  "purpose": "Home Loan",
  "expiresIn": "1d"
}
Response:

json
Copy
Edit
{
  "token": "JWT_TOKEN_STRING"
}
🔄 POST /api/access
Purpose: Simulate access by a third party using the JWT

json
Copy
Edit
{
  "token": "JWT_TOKEN_STRING"
}
Response:

json
Copy
Edit
{
  "status": "Access granted",
  "userId": "user_123",
  "receiptId": "receipt_001"
}
If token expired or invalid:

json
Copy
Edit
{
  "status": "Access denied",
  "error": "Token expired or invalid"
}
📚 GET /api/logs
Purpose: Return the full audit trail of access logs

json
Copy
Edit
[
  {
    "time": "2025-07-21T10:11:01Z",
    "receiptId": "receipt_001",
    "accessedBy": "HDFC Bank",
    "purpose": "Home Loan"
  }
]
✅ How to Test
Start server: node index.js

Use Postman or cURL:

First hit /api/consent to get a token

Then call /api/access with the token

View accessLogs.json for a full trail

🛡 Legal
Built in compliance with India's DPDP Act and principles of Open Finance. Supports time-bound and purpose-limited consent access.

yaml
Copy
Edit

---

## 🎨 `frontend/README.md`

```md
# 🧾 Consent UI Frontend – MS43

This is the frontend for the **Consent-backed Data Exchange (MS43)**. It lets users give permission to share digital receipts securely with banks, auditors, or advisors.

---

## 🚀 Tech Stack

- React (with Vite)
- Tailwind CSS
- Axios (for backend calls)
- JWT (used internally)

---

## 📁 Folder Structure

frontend/
├── public/
│ └── ...
├── src/
│ ├── App.jsx # Main consent form UI
│ └── index.css # Tailwind CSS imports
├── index.html
└── tailwind.config.js

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

```bash
cd frontend
npm install
npm run dev
📍 App runs at: http://localhost:5173

Make sure your backend (port 3000) is running!

💡 Features
Form with the following fields:

Receipt ID

Third Party (bank/auditor/etc.)

Purpose of sharing

Expiry time

On submit:

Sends POST request to backend /api/consent

Displays returned JWT token

Option to simulate access with that token

📦 Sample Payload Sent to Backend
json
Copy
Edit
{
  "userId": "user_123",
  "receiptId": "receipt_001",
  "thirdParty": "HDFC Bank",
  "purpose": "Home Loan",
  "expiresIn": "1d"
}
🔗 Backend Dependency
Make sure the backend is available at:

bash
Copy
Edit
http://localhost:3000/api/consent
http://localhost:3000/api/access
Update the base URL in App.jsx if needed.

🧪 How to Test
Start backend (node index.js)

Start frontend (npm run dev)

Fill in the form and click Generate Consent Token

See response → token appears on screen

Click Simulate Access to test access logging

✅ Done!
You now have a working frontend + backend for consent-backed digital receipt sharing.
