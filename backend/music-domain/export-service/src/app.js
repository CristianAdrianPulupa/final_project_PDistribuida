const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const exportRoutes = require('./routes/export.routes');

app.use(cors());
app.use(express.json());
app.use('/api', exportRoutes);

const PORT = process.env.PORT || 3014;
app.listen(PORT, () => {
  console.log(`export-service running on port ${PORT}`);
});
