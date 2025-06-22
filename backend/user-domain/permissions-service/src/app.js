const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const permissionRoutes = require('./routes/permissionRoutes');
app.use('/api/permissions', permissionRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Conectado a MongoDB (permissions-service)'))
.catch((err) => console.error('Error de conexión a MongoDB:', err.message));

app.get('/', (req, res) => {
  res.send('Permissions service is running!');
});

module.exports = app;
