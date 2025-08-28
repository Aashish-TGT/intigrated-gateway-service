# 📮 Feedback & Issue Reporting Microservice

A lightweight and secure microservice to collect feedback and issue reports from users or admins. Built with Node.js, Express, MongoDB, and JWT authentication.

---

## 🚀 Features

- 🧾 Submit feedback with categories like `bug`, `UI`, `feature request`
- 🔐 JWT authentication required to submit feedback
- 📦 MongoDB for storing all feedback data
- 🧠 Spam filter & email auto-response logic (optional/future ready)
- 📋 Admin can retrieve all submitted feedback
- 🛡️ Secure API endpoints with middleware

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)**
- *(Email functionality is disabled by default)*

---

## 📁 Folder Structure

microservices-16/
├── controllers/ # Business logic
│ └── feedbackController.js
├── models/ # Mongoose schema
│ └── Feedback.js
├── routes/ # API routing
│ └── feedbackRoutes.js
├── middleware/ # Auth middleware
│ └── authMiddleware.js
├── utils/ # Optional utilities (e.g., mailer)
├── .env # Environment variables
├── .gitignore
├── index.js # App entry point
└── package.json



---

## 🔐 Generate a JWT Token

For testing protected routes, generate a token:

```js
const jwt = require("jsonwebtoken");
const token = jwt.sign(
  { userId: "1234", role: "user" },
  "feedback_api_secret_786",
  { expiresIn: "1h" }
);
console.log(token);
📬 Sample API Request (Postman)
🔸 URL:
POST http://localhost:3000/api/feedback

🔸 Headers:

Content-Type: application/json
Authorization: Bearer <your_token>

🔸 Body (raw JSON):

{
  "name": "Manjeet",
  "email": "manjeet@example.com",
  "category": "bug",
  "message": "Login page crashing on submit"
}
🧪 Run the Server

npm install
npm start
MongoDB should be running locally at mongodb://localhost:27017/feedbackdb.

🧑‍💻 Developer
Name: Manish Kumari-TGT

Project: Feedback API Microservice

Purpose: Collect feedback from users securely for any web app

🪪 License
This project is licensed under the MIT License.
