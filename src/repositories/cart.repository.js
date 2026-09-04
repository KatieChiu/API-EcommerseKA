const cartRepository = require('../repositories/cart.repository');
const productRepository = require('../repositories/products.repository');

const findAll = async () => {
    return cartRepository.findAll();
};


const findById = async (id) => {

    if (!id || id.trim() === '') {
        throw new Error('El ID del carrito es obligatorio');
    }

    const cart = await cartRepository.findById(id);

    if (!cart) {
        throw new Error('El carrito no existe');
    }

    return cart;
};


const create = async (data) => {

    if (!data.sessionId || data.sessionId.trim() === '') {
        throw new Error('El sessionId es obligatorio');
    }

    return cartRepository.create({
        sessionId: data.sessionId.trim(),
        customerId: data.customerId || null
    });
};


const update = async (id, data) => {

    if (!id || id.trim() === '') {
        throw new Error('El ID del carrito es obligatorio');
    }

    const cart = await cartRepository.findById(id);

    if (!cart) {
        throw new Error('El carrito no existe');
    }

    return cartRepository.update(id, {
        customerId: data.customerId || null
    });
};


// =========================
// CART ITEMS
// =========================

const findItems = async (cartId) => {

    if (!cartId || cartId.trim() === '') {
        throw new Error('El ID del carrito es obligatorio');
    }

    const cart = await cartRepository.findById(cartId);

    if (!cart) {
        throw new Error('El carrito no existe');
    }

    return cartRepository.findItems(cartId);
};


const addItem = async (cartId, data) => {

    if (!cartId || cartId.trim() === '') {
        throw new Error('El ID del carrito es obligatorio');
    }

    if (!data.productId || data.productId.trim() === '') {
        throw new Error('El ID del producto es obligatorio');
    }

    if (!data.quantity || data.quantity <= 0) {
        throw new Error('La cantidad debe ser mayor que 0');
    }

    const cart = await cartRepository.findById(cartId);

    if (!cart) {
        throw new Error('El carrito no existe');
    }

    // El backend verifica que el producto realmente exista
    const product = await productRepository.findById(data.productId);

    if (!product) {
        throw new Error('El producto no existe');
    }

    if (!product.isActive) {
        throw new Error('El producto no está disponible');
    }

    if (product.stock < data.quantity) {
        throw new Error('No hay suficiente stock disponible');
    }

    return cartRepository.addItem({
        cartId,
        productId: data.productId,
        quantity: data.quantity
    });
};


const updateItem = async (id, data) => {

    if (!id || id.trim() === '') {
        throw new Error('El ID del producto del carrito es obligatorio');
    }

    if (!data.quantity || data.quantity <= 0) {
        throw new Error('La cantidad debe ser mayor que 0');
    }

    return cartRepository.updateItem(id, {
        quantity: data.quantity
    });
};


const deleteItem = async (id) => {

    if (!id || id.trim() === '') {
        throw new Error('El ID del producto del carrito es obligatorio');
    }

    return cartRepository.deleteItem(id);
};


module.exports = {
    findAll,
    findById,
    create,
    update,
    findItems,
    addItem,
    updateItem,
    deleteItem
};