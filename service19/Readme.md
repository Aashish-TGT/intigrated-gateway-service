# 🧩 User Onboarding Microservice

A lightweight Node.js microservice to register businesses after POS plugin installation.  
It handles user registration, email verification, and generates a secure tenant ID and API key.

---

## 🚀 Features

- ✅ Register new businesses
- ✅ Email verification using token
- ✅ Unique Tenant ID generation
- ✅ Secure API key generation
- ✅ MongoDB-backed storage

---

## 🧱 Folder Structure

microservices19/
├── config/ # MongoDB connection setup
│ └── db.js
├── controllers/ # Business logic for registration and verification
│ └── authController.js
├── models/ # Mongoose schemas
│ ├── Business.js
│ └── EmailToken.js
├── routes/ # API route definitions
│ └── authRoutes.js
├── utils/ # Utility functions (API key, Tenant ID generator)
│ ├── generateApiKey.js
│ └── generateTenantId.js
├── .env.example # Sample environment config (excluded: .env)
├── .gitignore # Prevents uploading of node_modules and .env
├── LICENSE # MIT License
├── README.md # You're reading it!
└── server.js # Main entry point


---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Tools:** dotenv, crypto, uuid

---

## ⚙️ Environment Setup

1. Create a `.env` file in the root:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/onboardingdb
BASE_URL=http://localhost:3000
Install dependencies:

npm install
Start MongoDB service (Windows):

net start MongoDB
Run the server:
node server.js
You should see:

✅ MongoDB Connected
🚀 Server running on port 5000
🧪 API Endpoints
🔹 POST /api/register
Register a new business and send a mock verification link (printed in terminal)

Body:

{
  "name": "SuperMart",
  "email": "supermart@example.com"
}
Response:

{
  "message": "Registration successful. Check mock email for verification link."
}
🔹 GET /api/verify-email/:token
Verify email and receive tenantId + apiKey

Response:

{
  "message": "Email verified successfully!",
  "tenantId": "tenant_supermart_1234",
  "apiKey": "api_xxxx-xxxx-uuid"
}
💡 The verification link is printed in the console (mock email).

🔐 Security Best Practices
.env is ignored in version control.

API keys are generated using UUIDs and can be used to secure other services.

Use .env.example to share config variables with other developers.

👨‍💻 Author
Minakshi