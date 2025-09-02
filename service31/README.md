# developer-portal
# 🛠️ Developer Portal Microservice (Microservice 31)

A lightweight Developer Portal built with  Node.js, Swagger, and ReDoc, allowing developers to:
- View and test API documentation
- Get sandbox API keys
- Test secured sample APIs using "Try it out"
---
## 📦 Features
- 📚 **Swagger UI** at `/docs` — interactive API docs
- 📖 **ReDoc** at `/redoc` — clean and elegant API documentation
- 🔑 **Sandbox API Key Generation** via `/get-sandbox-key`
- 🔒 **Protected Sample Endpoint** `/sample-api` that requires a sandbox key
- 🧪 **"Try It Out"** functionality with mock authorization
- 🛠️ Easily extendable for live vs sandbox backend support

---
🧰 1. Project Setup
Run these commands
1.npm init -y
2.npm install express swagger-ui-express redoc dotenv uuid
3.npm install yamljs(optional)
4.node server.js


## 🚀 Getting Started
### 1. Clone the Repository
git clone https://github.com/ Komal-TGT/developer-portal.git
cd developer-portal
2. Install Dependencies
npm install
3. Run the Server
node server.js
4. Environment
Create a .env file:
env
PORT=3000
________________________________________
📁 Project Structure
developer-portal/
│
├── server.js              # Main Express server
├── swagger.yaml           # Swagger API definition
├── redoc.html             # ReDoc UI viewer
├── .env                   # Environment config
└── keys/
    └── sandbox-keys.json  # Stores sandbox API keys
________________________________________
📘 API Documentation
🔹 Swagger UI
http://localhost:3000/docs
🔹 ReDoc UI
http://localhost:3000/redoc
________________________________________
🔑 API Key Workflow
1.	Send a POST request to /get-sandbox-key
2.	Use the returned apiKey in x-api-key header
3.	Access /sample-api with the key
Example:
curl -X POST http://localhost:3000/get-sandbox-key
Then use:
curl -X GET http://localhost:3000/sample-api -H "x-api-key: <your-key>"
________________________________________
🌐 Optional Enhancements
•	Add live/sandbox backend switching
•	Store API keys in a database
•	Set key expiration or rate limits
•	Add client login & dashboard
________________________________________
🧑‍💻 Tech Stack
•	Node.js + Express
•	Swagger UI + OpenAPI (YAML)
•	ReDoc (via CDN)
•	UUID for API key generation
________________________________________

🙋‍♂️ Made By
This microservice was developed as part of a professional backend microservice suite.
Created by KOMAL RANI 💻
🔗 GitHub: github.com/ Komal-TGT

________________________________________

