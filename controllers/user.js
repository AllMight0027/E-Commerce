const User = require('../models/User');
const Order = require('../models/Order').Order;
const ProductCart = require('../models/Order').ProductCart;

//extract user by id and populate req.profile (middleware)
exports.getUserById = (req,res,next,id)=>{
    User.findById(id)
        .then(user=>{
            if(!user) return res.status(400).json({status:'Failed',message:"User id doesn't exists"})
            req.profile = user
            next();
        })
        .catch(err=>console.log(err))
}

//throw req.profile to front end
exports.getUser = (req,res)=>{
    //hiding critical info
    req.profile.salt = undefined;
    req.profile.encryptPassword = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.__v = undefined;
    res.status(200).json(req.profile)
}

//update user by id
exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false}
    )
        .then(user=>{
            if(!user) return res.status(400).json({status:'Failed',message:"User id doesn't exists"})
            user.salt = undefined;
            user.encryptPassword = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            user.__v = undefined;
            res.status(200).json(user)
        })
        .catch(err=>console.log(err))
}

//get all orders of a user
exports.userPurchaseList = (req,res)=>{
    Order.find({user:req.profile._id})
    .then(orders=>{
        if(orders.length===0){
            return res.status(400).json({status:'Failed',message:"No Order exists"})
        }
        res.json(orders)
    })

}

//push order to purachase list (middleware)
exports.pushOrderInPurchaseList = (req,res,next)=>{
    let purchases =[]
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product.product._id,
            name: product.product.name,
            description: product.product.description,
            category: product.product.category,
            amount: req.body.order.amount,
            stockId: product.stockId
        });
    });
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true}
    )
        .then(purchases=>{
            return res.status(200).json({status:'Success',message:"Order saved in purchase list"})
        })
        .catch(err=>console.log(err))
    next();
}