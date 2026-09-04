const orderRepository = require('../repositories/order.repository');

const create = async (data) => {

    // Validar cliente
    if (!data.customerId || data.customerId.trim() === '') {
        throw new Error('El ID del cliente es obligatorio');
    }

    // Validar nombre de contacto
    if (!data.contactName || data.contactName.trim() === '') {
        throw new Error('El nombre de contacto es obligatorio');
    }

    // Validar teléfono principal
    if (!data.primaryPhone || data.primaryPhone.trim() === '') {
        throw new Error('El teléfono principal es obligatorio');
    }

    // Validar dirección
    if (!data.deliveryAddress || data.deliveryAddress.trim() === '') {
        throw new Error('La dirección de entrega es obligatoria');
    }

    // Validar productos
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
        throw new Error('La orden debe contener al menos un producto');
    }

    // Validar cada producto
    for (const item of data.items) {

        if (!item.productId || item.productId.trim() === '') {
            throw new Error('El ID del producto es obligatorio');
        }

        if (!item.quantity || item.quantity <= 0) {
            throw new Error('La cantidad del producto debe ser mayor que 0');
        }
    }

    return orderRepository.create({
        customerId: data.customerId.trim(),
        contactName: data.contactName.trim(),
        primaryPhone: data.primaryPhone.trim(),
        secondaryPhone: data.secondaryPhone?.trim() || null,
        deliveryAddress: data.deliveryAddress.trim(),
        status: 'PendingContact',

        items: data.items
    });
};

const updateStatus = async (id, newStatus) => {
    if (!id || id.trim() === '') {
        throw new Error('El ID de la orden es obligatorio');
    }
    const order = await orderRepository.findById(id);
    if (!order) {
        throw new Error('La orden no existe');
    }
    // Una orden que ya salió de Pending no puede cambiar nuevamente
    if (order.status !== 'Pending') {
        throw new Error(
            `La orden no puede cambiar de estado porque actualmente está en ${order.status}`
        );
    }

    const allowedStatuses = [
        'Completed',
        'Rejected',
        'PaymentFailed',
        'Cancelled'
    ];
    
    if (!allowedStatuses.includes(newStatus)) {
        throw new Error(
            'El nuevo estado no es válido'
        );
    }

    return orderRepository.updateStatus(id, newStatus);
};




module.exports = {
    create,
    updateStatus,
    list: () => orderRepository.findAll(),
    getById: (id) => orderRepository.findById(id),
    addItem: (data) => orderRepository.addItem(data),
    
};