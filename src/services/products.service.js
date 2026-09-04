const productsRepository = require('../repositories/products.repository');

// Capa de lógica de negocio y validaciones.
module.exports = {
  listActive: () => productsRepository.findAllActive(),

  getById: async (id) => {
    const product = await productsRepository.findById(id);
    if (!product) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      throw err;
    }
    return product;
  },

  create: (data) => productsRepository.create(data),

  update: (id, data) => productsRepository.update(id, data),

  // No se elimina físicamente: se desactiva para no romper pedidos históricos.
  deactivate: (id) => productsRepository.setActive(id, false),
  activate: (id) => productsRepository.setActive(id, true),
};
