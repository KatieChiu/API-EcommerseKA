const prisma = require('../config/prisma');

module.exports = {
  findAll: () =>
    prisma.cart.findMany({
      include: { items: { include: { product: true } } },
    }),

  findById: (id) =>
    prisma.cart.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    }),

  create: (data) => prisma.cart.create({ data }),

  update: (id, data) => prisma.cart.update({ where: { id }, data }),

  findItems: (cartId) =>
    prisma.cartItem.findMany({
      where: { cartId },
      include: { product: true },
    }),

  addItem: (data) => prisma.cartItem.create({ data }),

  updateItem: (id, data) =>
    prisma.cartItem.update({ where: { id }, data }),

  
  deleteItem: (id) => prisma.cartItem.delete({ where: { id } }),
};