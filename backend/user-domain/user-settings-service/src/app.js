const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/settings', settingsRoutes);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`🚀 user-settings-service corriendo en puerto ${PORT}`);
});
