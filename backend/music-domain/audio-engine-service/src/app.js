const express = require('express');
const app = express();
const port = 3012;

const routes = require('./routes');

app.use(express.json());
app.use('/api/audio', routes);

app.listen(port, () => {
  console.log(`🎛️ audio-engine-service running on port ${port}`);
});
