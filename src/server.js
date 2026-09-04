require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${4000}`);
});
const authRoutes = require('./routes/auth.routes');

app.use('/api/auth', authRoutes);