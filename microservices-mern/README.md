# MERN Microservices Architecture

A complete microservices implementation using MongoDB, Express, React, and Node.js (MERN stack).

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │ (Port 3000)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Gateway   │ (Port 5000)
└────────┬────────┘
         │
    ┌────┴────┬────────────┬──────────┐
    ▼         ▼            ▼          
┌────────┐ ┌────────┐ ┌────────┐
│ User   │ │Product │ │ Order  │
│Service │ │Service │ │Service │
│:5001   │ │:5002   │ │:5003   │
└───┬────┘ └───┬────┘ └───┬────┘
    │          │          │
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│MongoDB │ │MongoDB │ │MongoDB │
│users   │ │products│ │orders  │
└────────┘ └────────┘ └────────┘
```

## 📁 Project Structure

```
microservices-mern/
├── api-gateway/              # API Gateway (Port 5000)
│   ├── index.js
│   ├── middleware/
│   │   ├── proxy.js
│   │   └── rateLimiter.js
│   └── package.json
│
├── services/
│   ├── user-service/         # User Service (Port 5001)
│   │   ├── models/User.js
│   │   ├── controllers/userController.js
│   │   ├── routes/userRoutes.js
│   │   └── index.js
│   │
│   ├── product-service/      # Product Service (Port 5002)
│   │   ├── models/Product.js
│   │   ├── controllers/productController.js
│   │   ├── routes/productRoutes.js
│   │   └── index.js
│   │
│   └── order-service/        # Order Service (Port 5003)
│       ├── models/Order.js
│       ├── controllers/orderController.js
│       ├── routes/orderRoutes.js
│       └── index.js
│
└── client/                   # React Frontend (Port 3000)
```

## 🚀 Services

### 1. User Service (Port 5001)
**Responsibilities:**
- User registration and authentication
- JWT token generation
- User profile management

**Endpoints:**
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/users` - Get all users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update user profile

### 2. Product Service (Port 5002)
**Responsibilities:**
- Product catalog management
- Inventory tracking
- Product CRUD operations

**Endpoints:**
- `POST /api/products/products` - Create product
- `GET /api/products/products` - Get all products
- `GET /api/products/products/:id` - Get single product
- `PUT /api/products/products/:id` - Update product
- `DELETE /api/products/products/:id` - Delete product
- `GET /api/products/products/:id/availability` - Check stock

### 3. Order Service (Port 5003)
**Responsibilities:**
- Order creation and processing
- Inter-service communication with User and Product services
- Order status management

**Endpoints:**
- `POST /api/orders/orders` - Create order
- `GET /api/orders/orders` - Get all orders
- `GET /api/orders/orders/:id` - Get single order
- `GET /api/orders/orders/user/:userId` - Get user orders
- `PUT /api/orders/orders/:id/status` - Update order status
- `DELETE /api/orders/orders/:id` - Cancel order

### 4. API Gateway (Port 5000)
**Responsibilities:**
- Single entry point for all services
- Request routing and forwarding
- Rate limiting
- Request logging

**Features:**
- Proxies requests to appropriate microservices
- Rate limiting: 100 requests per 15 minutes per IP
- Centralized error handling
- Health check endpoint

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   cd /Users/roshanrejik/Desktop/Interview/microservices-mern
   ```

2. **Install dependencies for all services**
   ```bash
   # API Gateway
   cd api-gateway && npm install && cd ..

   # User Service
   cd services/user-service && npm install && cd ../..

   # Product Service
   cd services/product-service && npm install && cd ../..

   # Order Service
   cd services/order-service && npm install && cd ../..
   ```

3. **Configure environment variables**
   - Each service has a `.env` file already configured
   - Update MongoDB URIs if needed

## 🏃 Running the Application

### Option 1: Start All Services Manually

**Terminal 1 - User Service:**
```bash
cd services/user-service
npm start
```

**Terminal 2 - Product Service:**
```bash
cd services/product-service
npm start
```

**Terminal 3 - Order Service:**
```bash
cd services/order-service
npm start
```

**Terminal 4 - API Gateway:**
```bash
cd api-gateway
npm start
```

### Option 2: Use the Start Script

```bash
# Make the script executable
chmod +x start-all.sh

# Run all services
./start-all.sh
```

## 📡 API Usage Examples

### Register a User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a Product
```bash
curl -X POST http://localhost:5000/api/products/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "stock": 50
  }'
```

### Create an Order
```bash
curl -X POST http://localhost:5000/api/orders/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_HERE",
    "items": [
      {
        "productId": "PRODUCT_ID_HERE",
        "quantity": 2
      }
    ],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }'
```

## 🔍 Health Checks

Check if services are running:

```bash
# API Gateway
curl http://localhost:5000/health

# User Service
curl http://localhost:5001/health

# Product Service
curl http://localhost:5002/health

# Order Service
curl http://localhost:5003/health
```

## 🏛️ Microservices Patterns Implemented

### 1. API Gateway Pattern
- Single entry point for all client requests
- Request routing to appropriate services
- Cross-cutting concerns (rate limiting, logging)

### 2. Database per Service
- Each service has its own MongoDB database
- Data isolation and independence
- Service autonomy

### 3. Service-to-Service Communication
- Synchronous HTTP/REST communication
- Order Service calls User and Product services
- Validates data across services

### 4. Health Check Pattern
- Each service exposes `/health` endpoint
- Monitoring and service discovery support

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Rate limiting (100 requests/15 min)
- Input validation with Mongoose schemas
- CORS enabled

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date
}
```

### Products Collection
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  imageUrl: String,
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  userId: String,
  items: [{
    productId: String,
    productName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String,
  shippingAddress: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

Test each service independently:

```bash
# Test User Service
curl http://localhost:5001/health

# Test Product Service
curl http://localhost:5002/health

# Test Order Service
curl http://localhost:5003/health

# Test API Gateway
curl http://localhost:5000/health
```

## 🚧 Future Enhancements

- [ ] Add React frontend
- [ ] Implement service discovery (Consul/Eureka)
- [ ] Add message queue (RabbitMQ/Kafka)
- [ ] Implement circuit breaker pattern
- [ ] Add Docker support
- [ ] Add Kubernetes deployment
- [ ] Implement event-driven architecture
- [ ] Add monitoring (Prometheus/Grafana)
- [ ] Add distributed tracing (Jaeger)
- [ ] Implement API documentation (Swagger)

## 📝 License

MIT

## 👨‍💻 Author

Created for microservices architecture demonstration
