const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000  // ⏱ reduce el tiempo de espera
})
.then(() => console.log('Conectado a MongoDB (sessions-service)'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Sessions service is running!');
});

module.exports = app;
