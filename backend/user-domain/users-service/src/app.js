const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

console.log('🟡 Cargando middleware CORS...');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

console.log('🟡 Cargando middleware JSON...');
app.use(express.json());

console.log('🟢 Montando rutas de usuarios en /api/users...');
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado (users-service)'))
.catch(err => console.error('❌ Error de conexión MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Users service is running!');
});

module.exports = app;
