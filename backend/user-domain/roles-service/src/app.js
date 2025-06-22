const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const roleRoutes = require('./routes/roleRoutes');
app.use('/api/roles', roleRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB (roles-service)'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Roles service is running!');
});

module.exports = app;
