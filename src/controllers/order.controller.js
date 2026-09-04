const orderservice = require('../services/order.service');

module.exports={

    list: async (req, res, next)=>
    {
        try {
            const orders= await orderservice.list();
            res.json(orders);
        }
        catch(err)
        {
            next (err);
        }
    },
    update: async(req, res,next)=>
    {
        try{
            const order = await orderservice.updateStatus(id=req.params.id, newStatus=req.body.status);
            res.json(order);
        }
        catch(err)
        {
            next(err);
        }
    },
}