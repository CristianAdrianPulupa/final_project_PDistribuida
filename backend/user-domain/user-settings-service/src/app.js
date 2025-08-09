// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const settingsRoutes = require('./routes/settingsRoutes');
const swaggerDef = require('./swaggerDef');

const app = express();

// CORS middleware
console.log('🟡 loading CORS middleware...');
app.use(cors({ origin: 'http://98.80.152.185', credentials: true }));

// JSON parser
console.log('🟡 loading JSON middleware...');
app.use(express.json());

// Swagger setup
console.log('🟢 setting up Swagger UI at /api/docs');
const options = {
  definition: swaggerDef,               // ← use "definition" instead of "swaggerDefinition"
  apis: ['./routes/*.js', './models/*.js']
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to database
console.log('⏳ connecting to database...');
connectDB();

// Mount settings routes
console.log('🟢 mounting settings routes on /api/settings...');
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/', (req, res) => res.send('User Settings Service running'));

// Start server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`🚀 Service listening on port ${PORT}`));
