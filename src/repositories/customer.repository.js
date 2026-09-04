const prisma = require('../config/prisma');

module.exports={
    findAll: () => prisma.customer.findMany({
        orderBy: { fullName: 'asc' },
    }),
    
    create: (data) => prisma.customer.create({data}),

    update: (id, data) => prisma.customer.update({where:{id}, data}),

    delete: (id) => prisma.customer.delete({where:{id}}),
}