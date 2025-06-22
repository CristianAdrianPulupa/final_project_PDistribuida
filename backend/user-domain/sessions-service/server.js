const app = require('./src/app');
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Sessions service listening on port ${PORT}`);
});
