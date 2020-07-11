const { Order, ProductCart } = require('../models/Order')

exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id)
        .populate('products.product','name price')
        .then(order=>{
            if(!order) return res.status(400).json({status:'Failed',message:"Order id doesn't exists"})
            req.order = order
            next();
        })
        .catch(e=>console.log(e))
}

exports.getOrder = (req,res)=>{
    res.status(200).json(req.order);
}

exports.postOrder = (req,res)=>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save()
        .then(order=>{
            res.json(order)
        })
        .catch(err=>console.log(err))
}

exports.getAllOrders = (req,res)=>{
    Order.find()
        .populate('User', 'name _id')
        .then(orders=>{
            if(orders.length == 0)  return res.status(200).json({status:'Success',message:"No Orders exists"})
            res.status(200).json(orders)
        })
        .catch(err=>console.log(err))
}

exports.getOrderStatus = (req,res)=>{
    res.json(Order.schema.path('status').enumValues)
}

exports.updateSatus = (req,res)=>{
    Order.findByIdAndUpdate(
        {_id: req.order._id},
        {$set: req.body},
        {new: true, useFindAndModify: false}
    )
        .then(order=>{
            if(!order) return res.status(400).json({status:'Failed',message:"Errorwhile updating status"})
            res.json(order)
        })
        .catch(err=>console.log(err))
}