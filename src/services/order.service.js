const orderRepository = require('../repositories/order.repository');
const productRepository = require('../repositories/products.repository');
//const mailService = require('./email.service');

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

    const { enviarCorreo } = require('./email.service');

   await enviarCorreo({
    to: process.env.SELLER_EMAIL,
    subject: `🛒 Nuevo pedido #${order.orderNumber}`,
    text: `
Nuevo pedido #${order.orderNumber}

Cliente: ${order.contactName}
Teléfono: ${order.primaryPhone}
Teléfono secundario: ${order.secondaryPhone || 'No proporcionado'}
Dirección: ${order.deliveryAddress}

Total: L ${order.total}
Estado: ${order.status}
    `,
    html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo pedido</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, Helvetica, sans-serif;
            color: #333333;
        ">

            <div style="
                max-width: 650px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            ">

                <!-- HEADER -->
                <div style="
                    background-color: #1f3d2b;
                    padding: 28px 30px;
                    color: #ffffff;
                ">
                    <h1 style="
                        margin: 0;
                        font-size: 24px;
                    ">
                        🛒 Nuevo pedido recibido
                    </h1>

                    <p style="
                        margin: 8px 0 0;
                        font-size: 15px;
                        opacity: 0.9;
                    ">
                        Pedido #${order.orderNumber}
                    </p>
                </div>


                <!-- CONTENIDO -->
                <div style="padding: 30px;">

                    <p style="
                        margin-top: 0;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        Se ha registrado un nuevo pedido en <strong>eKAT</strong>.
                    </p>


                    <!-- CLIENTE -->
                    <div style="
                        margin-top: 25px;
                        border: 1px solid #e5e5e5;
                        border-radius: 8px;
                        padding: 20px;
                    ">

                        <h2 style="
                            margin: 0 0 15px;
                            font-size: 17px;
                            color: #1f3d2b;
                        ">
                            👤 Información del cliente
                        </h2>

                        <p style="margin: 8px 0;">
                            <strong>Nombre:</strong><br>
                            ${order.contactName}
                        </p>

                        <p style="margin: 8px 0;">
                            <strong>Teléfono:</strong><br>
                            ${order.primaryPhone}
                        </p>

                        <p style="margin: 8px 0;">
                            <strong>Teléfono secundario:</strong><br>
                            ${order.secondaryPhone || 'No proporcionado'}
                        </p>

                    </div>


                    <!-- ENTREGA -->
                    <div style="
                        margin-top: 20px;
                        border: 1px solid #e5e5e5;
                        border-radius: 8px;
                        padding: 20px;
                    ">

                        <h2 style="
                            margin: 0 0 15px;
                            font-size: 17px;
                            color: #1f3d2b;
                        ">
                            📍 Información de entrega
                        </h2>

                        <p style="
                            margin: 0;
                            line-height: 1.6;
                        ">
                            ${order.deliveryAddress}
                        </p>

                    </div>


                    <!-- TOTAL -->
                    <div style="
                        margin-top: 25px;
                        padding: 20px;
                        background-color: #f7f8f6;
                        border-radius: 8px;
                        text-align: center;
                    ">

                        <p style="
                            margin: 0 0 8px;
                            font-size: 14px;
                            color: #666666;
                        ">
                            TOTAL DEL PEDIDO
                        </p>

                        <p style="
                            margin: 0;
                            font-size: 30px;
                            font-weight: bold;
                            color: #1f3d2b;
                        ">
                            L ${order.total}
                        </p>

                        <p style="
                            margin: 10px 0 0;
                            font-size: 14px;
                        ">
                            Estado: <strong>${order.status}</strong>
                        </p>

                    </div>

                </div>


                <!-- FOOTER -->
                <div style="
                    padding: 20px 30px;
                    background-color: #fafafa;
                    border-top: 1px solid #eeeeee;
                    text-align: center;
                ">

                    <p style="
                        margin: 0;
                        font-size: 13px;
                        color: #777777;
                    ">
                        Este correo fue generado automáticamente por eKAT.
                    </p>

                    <p style="
                        margin: 6px 0 0;
                        font-size: 12px;
                        color: #999999;
                    ">
                        Por favor, no respondas directamente a este correo.
                    </p>

                </div>

            </div>

        </body>
        </html>
    `,
});


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