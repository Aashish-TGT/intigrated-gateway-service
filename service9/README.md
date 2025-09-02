# 🧾 POS Admin Panel Backend

This is a Node.js-based backend service for an Admin Panel used in a Point of Sale (POS) system. It enables retail admins to manage clients, monitor digital receipts, track subscription usage, view dues, and handle POS terminal data securely.

---

## 🚀 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MySQL (via Sequelize ORM)
- **Authentication**: JWT (JSON Web Token)
- **Security**: dotenv for environment variables, bcrypt for password hashing
- **Dev Tools**: nodemon for auto-reloading

---

## 📁 Project Structure

```
admin-panel-service/
│
├── config/
│   └── db.js               # Sequelize MySQL DB connection
│
├── middlewares/
│   └── auth.js             # JWT auth middleware
│
├── models/
│   ├── Admin.js            # Admin model
│   ├── Client.js           # Client model
│   └── Receipt.js          # Receipt model, with client association
│
├── routes/
│   ├── adminRoutes.js      # Admin registration and login
│   └── clientRoutes.js     # Client data, usage, and receipts
│
├── .env                    # Environment config (e.g. DB credentials, JWT secret)
├── app.js                  # Entry point of the application
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation (this file)
```

---

## 🔐 Environment Variables (.env)

```env
PORT=5009
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=@A18tauru123
DB_NAME=admin_panel_db
JWT_SECRET=adminSecretKey
```

---

## 🔧 Installation & Setup

1. **Clone the repo:**

```bash
git clone https://github.com/your-org/admin-panel-service.git
cd admin-panel-service
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Edit `.env` file with your DB credentials.

4. **Start MySQL and create the database manually (if not already created):**

```sql
CREATE DATABASE admin_panel_db;
```

5. **Run the app:**

```bash
npm run dev     # for development (with nodemon)
npm start       # for production
```

---

## 📦 API Endpoints

### 🔐 Admin Authentication

| Method | Route             | Description            |
|--------|------------------|------------------------|
| POST   | `/api/admin/register` | Register new admin |
| POST   | `/api/admin/login`    | Admin login, returns JWT |

---

### 👤 Client Management (JWT Protected)

Add header:  
`Authorization: Bearer <your_token>`

| Method | Route                         | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/clients`               | Get all clients                      |
| GET    | `/api/clients/:id/usage`     | Get subscription + dues info         |
| GET    | `/api/clients/:id/receipts`  | Get all receipts for a client        |
| POST   | `/api/clients/:id/receipts`  | Add new receipt + increment usage    |

---

## 🧪 Dummy Data

- A default test client is created on first run:
  - **Email**: `test@example.com`
  - **Name**: `Test Client`
  - **Subscription Limit**: `10`

---

## 📌 Features

- Admin user registration and JWT login
- Secure client listing and filtering
- Client receipt printing and POS source tracking
- Automatic subscription usage counting
- Real-time due amount and receipt history view

---

## 🧰 Future Enhancements (Suggestions)

- Admin dashboard UI (React-based frontend)
- Export reports to PDF/Excel
- Filter receipts by date range
- Add POS terminal source metadata
- Email notifications for dues

---

## 👨‍💻 Author

Made with ❤️ by **Aashish**  
Intern @ TGT by TerraGrid Tech

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more info.
