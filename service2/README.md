# MS6 Admin Panel Backend

This is the backend service for the **Admin Panel** of a Digital Receipts Platform (Microservice 6). It provides RESTful APIs for admin login, client management, receipt tracking, subscription updates, transaction monitoring, system logging, and dashboard analytics.

## 🚀 Tech Stack

- **Backend Framework:** Node.js + Express.js  
- **Database:** MySQL with Sequelize ORM  
- **Authentication:** JWT (JSON Web Token)  
- **Environment Config:** dotenv  
- **Testing:** Postman

---

## 📁 Project Structure

ms6-admin-backend/
├── controllers/
│ └── auth.controller.js
│ └── client.controller.js
│ └── log.controller.js
│ └── transaction.controller.js
│ └── dashboard.controller.js
├── models/
│ └── index.js
│ └── admin.model.js
│ └── client.model.js
│ └── receipt.model.js
│ └── log.model.js
│ └── transaction.model.js
├── routes/
│ └── auth.routes.js
│ └── client.routes.js
│ └── dashboard.routes.js
│ └── log.routes.js
│ └── transaction.routes.js
├── middlewares/
│ └── auth.middleware.js
├── utils/
│ └── logger.js
├── config/
│ └── db.config.js
├── .env
├── app.js
└── server.js


---

## 🔐 Authentication Flow

- **Login:** `POST /login`
- **JWT Protected Routes:** All routes except login require `Authorization: Bearer <token>`
- **Logout:** `POST /logout`
- **Token Handling:** Refresh token implementation (if added)

---

## 📊 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| POST   | `/login`       | Admin login         |
| POST   | `/logout`      | Admin logout        |

---

### 📋 Dashboard Summary

| Method | Endpoint              | Description                   |
|--------|-----------------------|-------------------------------|
| GET    | `/dashboard/summary`  | Get total clients, receipts, errors etc |

---

### 👤 Client Management

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | `/clients`            | Get all clients (with filters)     |
| PUT    | `/clients/:id`        | Update client info                 |
| PUT    | `/clients/:id/plan`   | Update client subscription plan    |

---

### 📄 Transactions

| Method | Endpoint              | Description                   |
|--------|-----------------------|-------------------------------|
| GET    | `/transactions`       | List all transactions (search/filter) |

---

### 🪵 System Logs

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/logs`          | Get all system logs with filters   |

---

### ❗ Error Logs

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/errors`        | Get only error logs (API/Receipt failures) |

---

## 🧪 Postman Collection

> ✅ Includes token-based auth, all routes grouped  
> 🔐 First run `/login`, then use returned token as `Bearer <token>` in `Authorization` header

**File:** [MS6_Admin_Backend.postman_collection.json](./MS6_Admin_Backend.postman_collection.json)

---

## ⚙️ Environment Variables (.env)

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=admin_panel_db
JWT_SECRET=your_jwt_secret


 Setup Instructions

 # Clone repo
git clone https://github.com/yourusername/ms6-admin-backend.git

# Navigate to project
cd ms6-admin-backend

# Install dependencies
npm install

# Setup your .env file
cp .env.example .env

# Run server
npm start

Future Enhancements
Add refresh token logic

API rate-limiting

Pagination improvements

Swagger documentation

Made  by Aashish and Komal Rani
intern in Tgt's

## 📄 License

This project is licensed under the [MIT License]
