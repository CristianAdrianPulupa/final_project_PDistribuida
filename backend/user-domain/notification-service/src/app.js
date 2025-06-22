const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db'); // ✅ nueva ruta correcta

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`✅ Notification service running on port ${PORT}`));
