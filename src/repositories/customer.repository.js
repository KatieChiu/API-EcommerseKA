const prisma = require('../config/prisma');

module.exports = {
    findAll: () => prisma.customer.findMany({
        orderBy: { fullName: 'asc' },
    }),

    findById: (id) => prisma.customer.findUnique({
        where: { id },
        include: { orders: true }, // para ver cuántos pedidos tiene, punto 15 de tu doc
    }),

    create: (data) => prisma.customer.create({ data }),

    update: (id, data) => prisma.customer.update({ where: { id }, data }),

    delete: (id) => prisma.customer.delete({ where: { id } }),
};