const categoryService = require('../services/category.service');

module.exports = {

    list: async (req, res, next)=>
    {
        try {
            const categories = await categoryService.list();
            res.json(categories);
        }
        catch (err) {
            next(err);
        }
    },

    getbyId: async (req, res, next)=>
    {
        try {
            const category = await categoryService.getById(req.params.id);
            res.json(category);
        }
        catch (err) {
            next(err);
        }   

    },
    create: async (req, res, next)=>
    {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json(category);
        }
        catch (err) {
            next(err);
        }   
    },

    update: async (req, res, next)=>
    {
        try {
            const category = await categoryService.update(req.params.id, req.body);
            res.json(category);
        }
        catch (err) {
            next(err);
        }   
    },
    delete: async (req, res, next)=>
    {
        try {
            const category = await categoryService.delete(req.params.id);
            res.json(category);
        }
        catch (err) {
            next(err);
        }   
    }
}