# 🛒 E-Commerce Backend API

A RESTful API built using **Node.js**, **Express.js**, and **MongoDB**, designed to support core functionalities of an e-commerce platform such as user authentication, product management, cart operations, and order handling. Includes interactive API documentation via Swagger.

---

## 🚀 Features

- ✅ User registration and login with JWT authentication  
- 🛍️ Product management (CRUD)  
- 🛒 Cart operations (add, update, remove, clear)  
- 📦 Order creation and tracking  
- 🔄 Payment simulation using Redis Pub/Sub  
- 🔐 Role-based access (Admin, User)  
- 📑 API documentation via Swagger at `/api-docs`

---

## 📦 Tech Stack

| Category        | Technology              |
|-----------------|-------------------------|
| Runtime         | Node.js                 |
| Framework       | Express.js              |
| Database        | MongoDB, Mongoose       |
| Auth            | JWT, Bcrypt             |
| Event System    | Redis Pub/Sub           |
| Documentation   | Swagger (OpenAPI)       |
| Environment     | dotenv                  |

---

## 📥 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Install Dependencies
```bash 
npm install 
```

### 3. Set up Environment Variable
```bash 
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```
### 4. Start Server
```bash 
node server.js
# OR
nodemon server.js

```

📬 API Endpoints
🔐 Auth Routes (/api/auth)

| Method | Endpoint    | Description                         |
| ------ | ----------- | ----------------------------------- |
| POST   | `/register` | Register a new user                 |
| POST   | `/login`    | Login and receive JWT token         |
| GET    | `/profile`  | Get current user info *(protected)* |
