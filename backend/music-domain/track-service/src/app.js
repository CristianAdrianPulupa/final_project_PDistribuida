require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
require('dotenv').config();

const trackRoutes = require('./routes/track.routes');
app.use(cors());
app.use(express.json());

app.use('/api/tracks', trackRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`track-service running on port ${PORT}`));
