const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const timelineRoutes = require('./routes/timeline.routes');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use('/api/timeline', timelineRoutes);

app.listen(process.env.PORT, () => {
  console.log(`timeline-service running on port ${process.env.PORT}`);
});
