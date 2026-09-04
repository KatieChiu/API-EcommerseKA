const prisma = require('../config/prisma');

// Capa de acceso a datos: solo Prisma, sin lógica de negocio.
module.exports = {
  findAllActive: () =>
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),

  findById: (id) =>
    prisma.product.findUnique({
      where: { id },
      include: { category: true },
    }),

  create: (data) => prisma.product.create({ data }),

  update: (id, data) => prisma.product.update({ where: { id }, data }),

  setActive: (id, isActive) =>
    prisma.product.update({ where: { id }, data: { isActive } }),
};
