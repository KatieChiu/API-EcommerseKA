const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminRepository = require('../../repositories/admin.repository');

const createUser = async (data) => {
  if (!data.fullName || data.fullName.trim() === '') {
    throw new Error('El nombre es obligatorio');
  }
  if (!data.email || data.email.trim() === '') {
    throw new Error('El correo es obligatorio');
  }
  if (!data.password || data.password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }

  const existente = await adminRepository.findByEmail(data.email.trim().toLowerCase());
  if (existente) {
    throw new Error('Ya existe un usuario con ese correo');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  return adminRepository.createUser({
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    passwordHash,
  });
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Correo y contraseña son obligatorios');
  }

  const user = await adminRepository.findByEmail(email.trim().toLowerCase());
  if (!user || !user.isActive) {
    throw new Error('Credenciales inválidas');
  }

  const passwordOk = await bcrypt.compare(password, user.passwordHash);
  if (!passwordOk) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = { createUser, login };