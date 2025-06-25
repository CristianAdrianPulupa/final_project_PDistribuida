const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 3040;

app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});