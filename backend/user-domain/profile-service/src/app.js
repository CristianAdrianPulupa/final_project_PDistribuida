const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

console.log('🟢 Montando rutas de perfil en /api/profile...');
const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);

console.log('⏳ Conectando a MongoDB...');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ MongoDB conectado (profile-service)'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err.message));

app.get('/', (req, res) => {
  res.send('Profile service is running!');
});

module.exports = app;
