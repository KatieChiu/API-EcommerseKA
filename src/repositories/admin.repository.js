const prisma = require('../config/prisma');

module.exports = {

    findByEmail: (email) =>
        prisma.adminUser.findUnique({
            where: { email }
        }),

    createUser: (data) =>
        prisma.adminUser.create({
            data,
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true
            }
        })
};