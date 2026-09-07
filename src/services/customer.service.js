const customerRepository = require('../repositories/customer.repository');

// Capa de negocio: valida datos y decide errores antes de tocar Prisma.
// El controller nunca debe llamar al repository directamente.

const assertRequiredFields = (data) => {
  const required = ['fullName', 'primaryPhone', 'address'];
  const missing = required.filter((field) => !data?.[field]);

  if (missing.length > 0) {
    const error = new Error(`Faltan campos requeridos: ${missing.join(', ')}`);
    error.status = 400;
    throw error;
  }
};

const assertExists = async (id) => {
  const customer = await customerRepository.findById(id);
  if (!customer) {
    const error = new Error('Cliente no encontrado');
    error.status = 404;
    throw error;
  }
  return customer;
};

module.exports = {
  list: () => customerRepository.findAll(),

  getById: async (id) => {
    return assertExists(id);
  },

  create: async (data) => {
    assertRequiredFields(data);

    return customerRepository.create({
      fullName: data.fullName,
      primaryPhone: data.primaryPhone,
      secondaryPhone: data.secondaryPhone || null,
      email: data.email || null,
      address: data.address,
    });
  },

  update: async (id, data) => {
    await assertExists(id);

    return customerRepository.update(id, {
      ...(data.fullName !== undefined && { fullName: data.fullName }),
      ...(data.primaryPhone !== undefined && { primaryPhone: data.primaryPhone }),
      ...(data.secondaryPhone !== undefined && { secondaryPhone: data.secondaryPhone }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.address !== undefined && { address: data.address }),
    });
  },

  delete: async (id) => {
    await assertExists(id);
    return customerRepository.delete(id);
  },
};