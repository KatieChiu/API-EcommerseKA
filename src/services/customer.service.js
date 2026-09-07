const customerRepository = require('../repositories/customer.repository');

const getById = async (id) => {
    if (!id) {
        throw new Error('El ID del cliente es obligatorio');
    }
    const customer = await customerRepository.findById(id);
    if (!customer) {
        throw new Error('El cliente no existe');
    }
    return customer;
};

const create = async (data) => {

    if (!data.fullName || data.fullName.trim() === '') {
        throw new Error('El nombre del cliente es obligatorio');
    }

    if (!data.primaryPhone || data.primaryPhone.trim() === '') {
        throw new Error('El teléfono principal es obligatorio');
    }

    if (!data.address || data.address.trim() === '') {
        throw new Error('La dirección es obligatoria');
    }
    const fullName = data.fullName.trim();
    const primaryPhone = data.primaryPhone.trim();
    const secondaryPhone = data.secondaryPhone?.trim() || null;
    const email = data.email?.trim() || null;
    const address = data.address.trim() || null;

    return customerRepository.create({
        fullName,
        primaryPhone,
        secondaryPhone,
        email,
        address
    });
};

const update = async (id, data) => {

    if (!id) {
        throw new Error('El ID del cliente es obligatorio');
    }

    if (!data.fullName || data.fullName.trim() === '') {
        throw new Error('El nombre del cliente es obligatorio');
    }

    if (!data.primaryPhone || data.primaryPhone.trim() === '') {
        throw new Error('El teléfono principal es obligatorio');
    }

    return customerRepository.update(id, {
        fullName: data.fullName.trim(),
        primaryPhone: data.primaryPhone.trim(),
        secondaryPhone: data.secondaryPhone?.trim() || null,
        email: data.email?.trim() || null,
        address: data.address?.trim() || null
    });
};

module.exports = {
    list: () => customerRepository.findAll(),
    getById,
    create,
    update,
    delete: (id) => customerRepository.delete(id),
};