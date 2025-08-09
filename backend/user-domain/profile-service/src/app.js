// src/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const profileRoutes = require('./routes/profileRoutes');
const swaggerDef = require('./swaggerDef');

const app = express();

// CORS middleware
console.log('🟡 loading CORS middleware...');
app.use(cors({
  origin: ['http://98.80.152.185'],
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// JSON parser
console.log('🟡 loading JSON middleware...');
app.use(express.json());

// Swagger setup
console.log('🟢 setting up Swagger UI at /api/docs');
const options = {
  swaggerDefinition: swaggerDef,
  apis: ['./routes/*.js', './models/*.js']
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount profile routes
console.log('🟢 mounting profile routes on /api/profile...');
app.use('/api/profile', profileRoutes);

// MongoDB connection
console.log('⏳ connecting to MongoDB...');
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected (profile-service)'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Health check
app.get('/', (req, res) => {
  res.send('Profile service is running!');
});

module.exports = app;
