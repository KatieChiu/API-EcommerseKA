const prisma = require('../config/prisma');

module.exports={

    findAll: () => prisma.category.findMany({
        orderBy: { name: 'asc' },
    }),

    create:(data)=> prisma.Category.create({data}),

    update:(id, data)=> prisma.Category.update({where:{id}, data}),

    delete:(id)=> prisma.Category.delete({where:{id}}),

}