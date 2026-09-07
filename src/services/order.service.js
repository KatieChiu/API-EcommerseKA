const orderRepository = require('../repositories/order.repository');
const productRepository = require('../repositories/products.repository');
const mailService = require('./mail.service');

const create = async (data) => {

    if (!data.customerId || data.customerId.trim() === '') {
        throw new Error('El ID del cliente es obligatorio');
    }
    if (!data.contactName || data.contactName.trim() === '') {
        throw new Error('El nombre de contacto es obligatorio');
    }
    if (!data.primaryPhone || data.primaryPhone.trim() === '') {
        throw new Error('El teléfono principal es obligatorio');
    }
    if (!data.deliveryAddress || data.deliveryAddress.trim() === '') {
        throw new Error('La dirección de entrega es obligatoria');
    }
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
        throw new Error('La orden debe contener al menos un producto');
    }

    // Armar snapshot de cada producto (nombre y precio en el momento de la compra)
    const itemsData = [];
    let subtotal = 0;

    for (const item of data.items) {
        if (!item.productId || item.productId.trim() === '') {
            throw new Error('El ID del producto es obligatorio');
        }
        if (!item.quantity || item.quantity <= 0) {
            throw new Error('La cantidad del producto debe ser mayor que 0');
        }

        const product = await productRepository.findById(item.productId);
        if (!product) {
            throw new Error(`El producto ${item.productId} no existe`);
        }
        if (!product.isActive) {
            throw new Error(`El producto ${product.name} no está disponible`);
        }

        const unitPrice = Number(product.price);
        const itemSubtotal = unitPrice * item.quantity;
        subtotal += itemSubtotal;

        itemsData.push({
            productId: product.id,
            productName: product.name,
            unitPrice,
            quantity: item.quantity,
            discount: 0,
            tax: 0,
            subtotal: itemSubtotal,
        });
    }

    const order = await orderRepository.create({
        customer: { connect: { id: data.customerId.trim() } },
        contactName: data.contactName.trim(),
        primaryPhone: data.primaryPhone.trim(),
        secondaryPhone: data.secondaryPhone?.trim() || null,
        deliveryAddress: data.deliveryAddress.trim(),
        status: 'Pending',
        subtotal,
        discountTotal: 0,
        taxTotal: 0,
        shippingTotal: 0,
        total: subtotal,
        items: { create: itemsData },
    });

    // Notificar al vendedor — si el correo falla, no debe tumbar la creación del pedido
    try {
        await mailService.enviarCorreo({
            to: process.env.VENDOR_EMAIL,
            subject: `Nuevo pedido pendiente #${order.orderNumber}`,
            text: `Cliente: ${order.contactName}\nTeléfono: ${order.primaryPhone}\nTotal: L ${order.total}\nDirección: ${order.deliveryAddress}`,
        });
    } catch (err) {
        console.error('No se pudo enviar el correo de notificación:', err);
    }

    return order;
};

const updateStatus = async (id, newStatus) => {
    if (!id || id.trim() === '') {
        throw new Error('El ID de la orden es obligatorio');
    }
    const order = await orderRepository.findById(id);
    if (!order) {
        throw new Error('La orden no existe');
    }
    if (order.status !== 'Pending') {
        throw new Error(
            `La orden no puede cambiar de estado porque actualmente está en ${order.status}`
        );
    }

    const allowedStatuses = ['Completed', 'Rejected', 'PaymentFailed'];
    if (!allowedStatuses.includes(newStatus)) {
        throw new Error('El nuevo estado no es válido');
    }

    return orderRepository.updateStatus(id, newStatus);
};

module.exports = {
    create,
    updateStatus,
    list: () => orderRepository.findAll(),
    getById: (id) => orderRepository.findById(id),
};