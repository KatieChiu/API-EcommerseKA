const authService = require('../services/auth/auth.service');

const createUser = async (req, res) => {
    try {
        const user = await authService.createUser(req.body);
        res.status(201).json({
            message: 'Usuario creado correctamente',
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};

module.exports = { createUser, login };