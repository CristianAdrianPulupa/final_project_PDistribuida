const app = require('./src/app');
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Roles service listening on port ${PORT}`);
});
