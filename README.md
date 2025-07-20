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

### 📬 API Endpoints
## 🔐 Auth Routes (/api/auth)

| Method | Endpoint    | Description                         |
| ------ | ----------- | ----------------------------------- |
| POST   | `/register` | Register a new user                 |
| POST   | `/login`    | Login and receive JWT token         |
| GET    | `/profile`  | Get current user info *(protected)* |

## 🛍️ Product Routes (/api/products)

| Method | Endpoint | Description                     |
| ------ | -------- | ------------------------------- |
| GET    | `/`      | Get all products                |
| GET    | `/:id`   | Get a product by ID             |
| POST   | `/`      | Add new product *(admin only)*  |
| PUT    | `/:id`   | Update a product *(admin only)* |
| DELETE | `/:id`   | Delete a product *(admin only)* |

## 🛒 Cart Routes (/api/cart)

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| GET    | `/`               | Get current user's cart      |
| POST   | `/add`            | Add item to cart             |
| PUT    | `/update/:itemId` | Update quantity of cart item |
| DELETE | `/remove/:itemId` | Remove item from cart        |
| DELETE | `/clear`          | Clear entire cart            |

## 📦 Order Routes (/api/orders)

| Method | Endpoint | Description                           |
| ------ | -------- | ------------------------------------- |
| POST   | `/`      | Create a new order from cart *(user)* |
| GET    | `/:id`   | Get specific order by ID *(user)*     |

## 🔄 Payment Simulation Using Redis Pub/Sub

| Event                | Channel                | Description                                  |
| -------------------- | ---------------------- | -------------------------------------------- |
| `order_created`      | Published by API       | After order is placed                        |
| `payment_successful` | Published by simulator | After 2s fake delay via `simulatePayment.js` |
| `email_simulated`    | Console log only       | Logs fake email confirmation after payment   |

## 📑 Swagger Documentation

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| GET    | `/api-docs` | Swagger UI for all API routes |

## 📄 License
This project is licensed under the MIT License – see the LICENSE file for details.