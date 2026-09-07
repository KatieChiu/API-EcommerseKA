const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products.routes');
const categoryRoutes = require('./routes/categories.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/orders.routes');
const adminOrderRoutes = require('./routes/admin.orders.routes');
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');


const app = express();
const swaggerUi = require('swagger-ui-express'); 
const swaggerSpec = require('./config/swagger'); 

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Público
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);

// Admin
app.use('/api/auth', authRoutes);
app.use('/api/admin/orders', adminOrderRoutes);

// Manejador de errores centralizado
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Error interno del servidor' });
});

module.exports = app;
