## 📱 Mobile App API Gateway

This is an Express-based API Gateway designed to authenticate and route mobile app requests to a microservice (like a digital receipt generator). It uses JWT authentication to ensure only authorized users can access protected routes.

---

### 📁 Folder Structure

```

mobile-app-gateway-services/
├── gateway/           # Express Gateway server
│   └── mobile.js      # Gateway routing and JWT validation
├── receipt-service/   # Microservice that generates receipts
├── .env               # Environment variables (JWT secret)
├── package.json
└── README.md
```

---

### 🚀 Features

* 🔐 JWT-based authentication
* ⚙️ Middleware for token validation
* ↻ Forwards authorized requests to downstream services
* ❌ Blocks invalid or missing tokens
* 🌐 Supports communication between multiple microservices

---

### 📦 Installation

```bash
git clone https://github.com/your-username/mobile-app-gateway-services.git
cd mobile-app-gateway-services/gateway
npm install
```

---

### ⚙️ Configuration

Create a `.env` file in the `gateway/` folder:

```env
PORT=3000
JWT_SECRET=mysecret123
```

Make sure the same `JWT_SECRET` is used in your token generator (auth service or manually).

---

### 🔐 JWT Token Format

When making API requests, pass the token in the `Authorization` header like this:

```
Authorization: Bearer <your_jwt_token>
```

---

### 🧪 Sample JWT Payload

```json
{
  "user": "test",
  "iat": 1752669034,
  "exp": 1752672634
}
```

Generate token using:

```js
const jwt = require('jsonwebtoken');
const token = jwt.sign({ user: 'test' }, process.env.JWT_SECRET, { expiresIn: '1h' });
```

---

### 🛚️ Available Routes

| Method | Endpoint              | Description                       | Protected |
| ------ | --------------------- | --------------------------------- | --------- |
| GET    | `/mobile/receipt/:id` | Fetch a receipt from microservice | ✅ Yes     |

---

### 🧾 Example Usage (Postman)

**GET** `http://localhost:3000/mobile/receipt/123`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

**Response:**

```json
{
  "receiptId": "123",
  "amount": 100,
  "status": "paid"
}
```

---

### ❌ Error Handling

| Status | Message                 | Cause                            |
| ------ | ----------------------- | -------------------------------- |
| 401    | Token missing           | No Authorization header provided |
| 401    | Invalid token           | Token expired or not valid       |
| 500    | Failed to fetch receipt | Microservice unavailable         |

---

### 🧑‍💻 Development

Start the gateway:

```bash
node server.js
```

Or use:

```bash
npm start
```

---

### 📌 Dependencies

* `express`
* `jsonwebtoken`
* `axios`
* `dotenv`

Install with:

```bash
npm install express jsonwebtoken axios dotenv
```

---

### 📂 Microservice URL

Make sure your **receipt microservice** is running and reachable at:

```
http://localhost:5001/receipt/:id
```

---

### 🛅 Future Improvements

* Add Rate Limiting
* Support for more microservices
* Logging and monitoring
* Refresh token support

---

### 🧑‍💼 Author

Made by **Suraj Maurya**
🔗 Portfolio
