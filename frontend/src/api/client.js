import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =========================
// PRODUCTOS / CATEGORÍAS (público)
// =========================
export const getProducts = () =>
  client.get('/products').then((r) => r.data);

export const getProduct = (id) =>
  client.get(`/products/${id}`).then((r) => r.data);

export const getCategories = () =>
  client.get('/categories').then((r) => r.data);

// =========================
// CARRITO
// =========================
export const createCart = (sessionId) =>
  client.post('/cart', { sessionId }).then((r) => r.data);

export const getCartItems = (cartId) =>
  client.get(`/cart/${cartId}/items`).then((r) => r.data);

export const addCartItem = (cartId, productId, quantity) =>
  client.post(`/cart/${cartId}/items`, { productId, quantity }).then((r) => r.data);

export const updateCartItem = (itemId, quantity) =>
  client.put(`/cart/items/${itemId}`, { quantity }).then((r) => r.data);

export const deleteCartItem = (itemId) =>
  client.delete(`/cart/items/${itemId}`).then((r) => r.data);

// =========================
// CLIENTES / PEDIDOS (público)
// =========================
export const createCustomer = (data) =>
  client.post('/customers', data).then((r) => r.data);

export const createOrder = (data) =>
  client.post('/orders', data).then((r) => r.data);

// =========================
// ADMIN - AUTH
// =========================
export const adminLogin = async (email, password) => {
  const { data } = await client.post('/auth/login', { email, password });
  localStorage.setItem('adminToken', data.token);
  localStorage.setItem('adminUser', JSON.stringify(data.user));
  return data;
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

export const isAdminLoggedIn = () => !!localStorage.getItem('adminToken');

export const getAdminUser = () => {
  const raw = localStorage.getItem('adminUser');
  return raw ? JSON.parse(raw) : null;
};

// =========================
// ADMIN - PEDIDOS
// =========================
export const getAdminOrders = () =>
  client.get('/admin/orders').then((r) => r.data);

export const updateOrderStatus = (id, status) =>
  client.patch(`/admin/orders/${id}/status`, { status }).then((r) => r.data);

// =========================
// ADMIN - PRODUCTOS (usa las rutas reales /products)
// =========================
export const getProductsadmin = () =>
  client.get('/products').then((r) => r.data);

export const postProduct = (data) =>
  client.post('/products', data).then((r) => r.data);

export const updateProduct = (id, data) =>
  client.put(`/products/${id}`, data).then((r) => r.data);

export const deleteProduct = (id) =>
  client.delete(`/products/${id}`).then((r) => r.data);

// =========================
// ADMIN - CATEGORÍAS (usa las rutas reales /categories)
// =========================
export const getCategoriesadmin = () =>
  client.get('/categories').then((r) => r.data);

export const postCategory = (data) =>
  client.post('/categories', data).then((r) => r.data);

export const updateCategory = (id, data) =>
  client.put(`/categories/${id}`, data).then((r) => r.data);

export default client;