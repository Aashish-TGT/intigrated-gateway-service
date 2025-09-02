# 🔐 Auth & RBAC Microservice

A Node.js + Express microservice for **Authentication, Authorization, and Role-Based Access Control (RBAC)**.  
Supports **JWT**, **OAuth2 / Azure AD B2C**, access & refresh tokens, and multi-role access for POS systems.

---

## 📌 Features
- Secure **user authentication** with JWT
- **Role-based access control (RBAC)**:
  - POS_USER
  - BUSINESS_ADMIN
  - SUPER_ADMIN
- **Access & Refresh tokens** with rotation
- **Multi-Factor Authentication (MFA)** *(optional)*
- **Azure AD B2C integration** (toggle via config)
- Rate limiting, error handling, and audit logging
- Dockerized for easy deployment

---

## 🏗️ Project Structure
├─ src/
│ ├─ middleware/
│ │ ├─ auth.js
│ │ ├─ requireRole.js
│ │ ├─ errorHandler.js
│ │ └─ rateLimiter.js
│ ├─ services/
│ │ ├─ authService.js
│ │ ├─ tokenService.js
│ │ └─ azureB2CValidator.js
│ ├─ controllers/
│ │ ├─ authController.js
│ │ └─ userController.js
│ └─ routes/
│ ├─ authRoutes.js
│ └─ userRoutes.js
├─ .env.example
├─ Dockerfile
├─ docker-compose.yml
└─ README.md


---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-org/auth-rbac-microservice.git
cd auth-rbac-microservice

2. Install dependencies
npm install

3. Configure environment

Copy .env.example into .env and update values:
cp .env.example .env

🚀 Running the Service
Local
npm run dev

With Docker
docker-compose up --build

🔑 API Endpoints
Auth Routes

POST /api/auth/register → Register new user
POST /api/auth/login → Login and get access + refresh tokens
POST /api/auth/refresh → Refresh token rotation
POST /api/auth/logout → Logout (revoke refresh token)

User Routes
GET /api/users/me → Get current logged-in user
GET /api/users → (ADMIN only) list all users

🛡️ Security

JWT (RS256 / HS256) with short-lived access tokens
Refresh tokens stored securely in DB
Optional MFA (TOTP / SMS / Email)
Rate limiting & brute-force protection
Azure AD B2C support for enterprise SSO

🧪 Testing

Use the provided Postman collection in /postman/AuthRBAC.postman_collection.json

📦 Deployment

Works with Azure, AWS ECS/Fargate, or Kubernetes
Add MONGO_URI, JWT_SECRET, and AZURE_B2C_* configs in .env

👨‍💻 Author
Sumit Kumar (Product Development Intern @ TeraGridTech, B.Tech CSE)










