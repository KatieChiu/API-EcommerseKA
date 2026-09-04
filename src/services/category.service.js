const categoryRepository = require('../repositories/Category.repository');

const create = async (data) => {

    if (!data.name || data.name.trim() === '') {
        throw new Error('El nombre de la categoría es obligatorio');
    }

    if (!data.slug || data.slug.trim() === '') {
        throw new Error('El slug de la categoría es obligatorio');
    }

    const name = data.name.trim();
    const slug = data.slug.trim().toLowerCase();

    return categoryRepository.create({
        name,
        slug
    });
};

const update = async (id, data) => {

    if (!id) {
        throw new Error('El ID de la categoría es obligatorio');
    }

    if (!data.name || data.name.trim() === '') {
        throw new Error('El nombre de la categoría es obligatorio');
    }

    if (!data.slug || data.slug.trim() === '') {
        throw new Error('El slug de la categoría es obligatorio');
    }

    const name = data.name.trim();
    const slug = data.slug.trim().toLowerCase();

    return categoryRepository.update(id, {
        name,
        slug
    });
};



module.exports = {
    list: () => categoryRepository.findAll(),
    create,
    update,
    delete: (id) => categoryRepository.delete(id),
};