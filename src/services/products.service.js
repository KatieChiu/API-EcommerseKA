const productsRepository = require('../repositories/products.repository');

const create = async (data) => {

  if (!data.name || data.name.trim() === '') {
    throw new Error('El nombre del producto es obligatorio');
  }
  if (!data.categoryId) {
    throw new Error('El ID de la categoría es obligatorio');
  }

  if (data.price === undefined || data.price === null || data.price <= 0) {
    throw new Error('El precio debe ser mayor que 0');
  }
  const name = data.name.trim();
  return productsRepository.create({
    name,
    categoryId: data.categoryId,
    price: data.price,
    description: data.description,
    isActive: data.isActive !== undefined ? data.isActive : true
  });
};


const update = async (id, data) => {

  if (!id) {
    throw new Error('El ID del producto es obligatorio');
  }

  if (!data.name || data.name.trim() === '') {
    throw new Error('El nombre del producto es obligatorio');
  }

  if (!data.categoryId) {
    throw new Error('El ID de la categoría es obligatorio');
  }

  if (data.price === undefined || data.price === null || data.price <= 0) {
    throw new Error('El precio debe ser mayor que 0');
  }

  const name = data.name.trim();

  return productsRepository.update(id, {
    name,
    categoryId: data.categoryId,
    price: data.price,
    description: data.description,
    isActive: data.isActive
  });
};

const setActive = async (id, isActive) => {
  if (!id) {
    throw new Error('El ID del producto es obligatorio');
  }

  if (typeof isActive !== 'boolean') {
    throw new Error('isActive debe ser verdadero o falso');
  }

  return productsRepository.setActive(id, isActive);
};


module.exports = {
  
  list: () => productsRepository.findAllActive(),
  getById: (id) => productsRepository.findById(id),
  create,
  update,
  delete: (id) => productsRepository.delete(id),
  setActive


};
