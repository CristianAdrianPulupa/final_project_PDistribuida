const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const waveformRoutes = require('./routes/waveform.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/waveform', waveformRoutes);

const PORT = 3013;
app.listen(PORT, () => {
  console.log(`waveform-service running on port ${PORT}`);
});
