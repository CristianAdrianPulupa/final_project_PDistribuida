// src/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const swaggerDef = require('./swaggerDef');
const cors = require('cors'); 

const app = express();

// CORS middleware
console.log('🟡 loading middleware CORS...');
app.use(cors({
  origin: ['http://98.80.152.185', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// JSON parser
console.log('🟡 loading middleware JSON...');
app.use(express.json());

// Swagger setup
console.log('🟢 setting up Swagger UI at /api/docs');
const options = {
  swaggerDefinition: swaggerDef,
  apis: ['./src/routes/*.js', './src/models/*.js']
};
const swaggerSpec = swaggerJsdoc(options);
console.log('🟢 swaggerSpec paths:', options.apis);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount user routes
console.log('🟢 mounting user routes on /api/users...');
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected (users-service)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Users service is running!');
});

module.exports = app;
