 Dynamic Receipt Context Engine

This microservice dynamically selects and returns the appropriate receipt template based on input metadata like brand, outlet, language, type, etc

📁 File Structure 

├── controllers/                    # 🎮 Contains the controller that handles request logic
│   └── contextController.js        # 👉 Logic to resolve the dynamic receipt context (template)

├── models/                         # 🧠 Contains the Mongoose schema (MongoDB structure)
│   └── ContextRule.js              # 👉 Schema for storing brand, outlet, type, language, etc.

├── routes/                         # 🌐 All the REST API route definitions
│   └── contextRoutes.js            # 👉 Route for POST /api/context/resolve

├── services/                       # 💼 Business logic layer (separates DB queries from controllers)
│   └── contextService.js           # 👉 Service to query MongoDB for matching rule/template

├── node_modules/                   # 📦 Auto-generated folder containing all project dependencies

├── .gitignore                      # 🚫 Tells Git which files/folders to ignore (like node_modules)

├── LICENSE                         # 📜 License file (MIT License, open-source usage permission)

├── package.json                    # 📦 Project metadata, scripts, and dependencies

├── package-lock.json              # 🔒 Locked versions of dependencies (auto-generated)

├── README.md                       # 📘 Project overview, setup instructions, API docs

📁 Step 2: Install Dependencies

npm install


⚙️ Tech Stack
Node.js

Express.js

MongoDB

Mongoose

Postman (for testing)


📡 API Endpoint
POST /api/context/resolve
Request Body:

{
  "brand": "Zomato",
  "outlet": "Delhi1",
  "type": "invoice",
  "language": "en"
}
Response:


{
  "templateId": "tpl_zomato_invoice_v2",
  "version": 2
}

👩‍💻 Author
Created by Manish Kumari 