const app = require('./src/app');
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Profile service listening on port ${PORT}`);
});
