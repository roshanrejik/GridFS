#!/bin/bash

echo "🚀 Starting all microservices..."
echo ""

# Start User Service
echo "📦 Starting User Service (Port 5001)..."
cd services/user-service
npm start &
USER_PID=$!
cd ../..

sleep 2

# Start Product Service
echo "📦 Starting Product Service (Port 5002)..."
cd services/product-service
npm start &
PRODUCT_PID=$!
cd ../..

sleep 2

# Start Order Service
echo "📦 Starting Order Service (Port 5003)..."
cd services/order-service
npm start &
ORDER_PID=$!
cd ../..

sleep 2

# Start API Gateway
echo "🌐 Starting API Gateway (Port 5000)..."
cd api-gateway
npm start &
GATEWAY_PID=$!
cd ..

echo ""
echo "✅ All services started!"
echo ""
echo "Process IDs:"
echo "  User Service: $USER_PID"
echo "  Product Service: $PRODUCT_PID"
echo "  Order Service: $ORDER_PID"
echo "  API Gateway: $GATEWAY_PID"
echo ""
echo "To stop all services, run:"
echo "  kill $USER_PID $PRODUCT_PID $ORDER_PID $GATEWAY_PID"
echo ""
echo "Access the API Gateway at: http://localhost:5000"

# Wait for all background processes
wait
