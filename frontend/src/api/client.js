import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getProducts = () =>
  client.get('/products').then((r) => r.data);

export const getProduct = (id) =>
  client.get(`/products/${id}`).then((r) => r.data);

export const getCategories = () =>
  client.get('/categories').then((r) => r.data);

export const createCart = (sessionId) =>
  client.post('/cart', { sessionId }).then((r) => r.data);

export const getCartItems = (cartId) =>
  client.get(`/cart/${cartId}/items`).then((r) => r.data);

export const addCartItem = (cartId, productId, quantity) =>
  client
    .post(`/cart/${cartId}/items`, { productId, quantity })
    .then((r) => r.data);

export const updateCartItem = (itemId, quantity) =>
  client
    .put(`/cart/items/${itemId}`, { quantity })
    .then((r) => r.data);

export const deleteCartItem = (itemId) =>
  client.delete(`/cart/items/${itemId}`).then((r) => r.data);

export const createCustomer = (data) =>
  client.post('/customers', data).then((r) => r.data);

export const createOrder = (data) =>
  client.post('/orders', data).then((r) => r.data);

export default client;