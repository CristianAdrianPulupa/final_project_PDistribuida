// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const notificationRoutes = require('./routes/notificationRoutes');
const swaggerDef = require('./swaggerDef');

const app = express();

// CORS and JSON
console.log('🟡 loading CORS and JSON middleware...');
app.use(cors({ origin: 'http://98.80.152.185', credentials: true }));
app.use(express.json());

// Swagger setup
console.log('🟢 setting up Swagger UI at /api/docs');
const options = {
  definition: swaggerDef,
  apis: ['./routes/*.js','./models/*.js']
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database
console.log('⏳ connecting to database...');
connectDB();

// Routes
console.log('🟢 mounting notification routes on /api/notifications...');
app.use('/api/notifications', notificationRoutes);

// Healthcheck
app.get('/', (req, res) => res.send('Notification Service running'));

// Start
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`🚀 Notification Service running on port ${PORT}`));
