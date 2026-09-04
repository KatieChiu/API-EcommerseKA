const prisma = require('../config/prisma');

module.exports = {

    findAll: () => prisma.order.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    }),

    findById: (id) => prisma.order.findUnique({
        where: { id },
        include: {
            customer: true,
            items: {
                include: {
                    product: true,
                },
            },
            payments: true,
        },
    }),

    updateStatus: (id, status) => prisma.order.update({
        where: { id },
        data: { status },
    }),

    create: (data) => prisma.order.create({
        data,
    }),

    addItem: (data) => prisma.orderItem.create({
        data,
    }),

};