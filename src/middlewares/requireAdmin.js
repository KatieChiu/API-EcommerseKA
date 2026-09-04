const jwt = require('jsonwebtoken');

// Middleware de autenticación para rutas administrativas.
// Se implementará por completo en el paso de "Seguridad / Auth".
module.exports = function requireAdmin(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.adminUser = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
