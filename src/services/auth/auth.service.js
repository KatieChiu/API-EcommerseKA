const bcrypt = require('bcrypt');
const authRepository = require('../repositories/auth.repository');

const createUser = async (data) => {

    if (!data.fullName || data.fullName.trim() === '') {
        throw new Error('El nombre completo es obligatorio');
    }

    if (!data.email || data.email.trim() === '') {
        throw new Error('El correo electrónico es obligatorio');
    }

    if (!data.password || data.password.trim() === '') {
        throw new Error('La contraseña es obligatoria');
    }

    if (data.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    const email = data.email.trim().toLowerCase();

    const existingUser = await authRepository.findByEmail(email);

    if (existingUser) {
        throw new Error('Ya existe un usuario con ese correo electrónico');
    }

    if (data.role && !['Admin', 'Vendedor'].includes(data.role)) {
        throw new Error('El rol debe ser Admin o Vendedor');
    }

    // La contraseña nunca se guarda directamente
    const passwordHash = await bcrypt.hash(data.password, 10);

    return authRepository.createUser({
        fullName: data.fullName.trim(),
        email,
        passwordHash,
        role: data.role || 'Vendedor',
        isActive: true
    });
};


const login = async (email, password) => {

    if (!email || email.trim() === '') {
        throw new Error('El correo electrónico es obligatorio');
    }

    if (!password || password.trim() === '') {
        throw new Error('La contraseña es obligatoria');
    }

    const admin = await authRepository.findByEmail(
        email.trim().toLowerCase()
    );

    if (!admin) {
        throw new Error('Correo o contraseña incorrectos');
    }

    if (!admin.isActive) {
        throw new Error('El usuario está desactivado');
    }

    const passwordCorrecta = await bcrypt.compare(
        password,
        admin.passwordHash
    );

    if (!passwordCorrecta) {
        throw new Error('Correo o contraseña incorrectos');
    }

    return {
        id: admin.id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role
    };
};


module.exports = {
    createUser,
    login
};