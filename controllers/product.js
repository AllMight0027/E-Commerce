const Product = require('../models/Product')
const formidable = require('formidable');
const mongoose = require('mongoose');
const _ = require('lodash');
const fs = require('fs');

//param middleware for product
exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
        .populate('Category')
        .then(product=>{
            if(!product) return res.status(400).json({status:'Failed',message:"Product id doesn't exists"})
            req.product = product
            next();
        })
        .catch(err=>console.log(err))
}

//create a new product
exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.maxFileSize = 2 * 1024 * 1024

    form.parse(req,(err,fields,files)=>{
        if(err) return res.status(400).json({status:'Failed',error:"Problem with image file"})

        //destructuring fields
        const {name,description,category,stock,price} = fields;

        if(!name|| !description|| !category|| !price) return res.status(400).json({status:'Failed',error:"Enter all fields"})

        let product = new Product(fields)

        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type;
        }

        //save to the db
        product.save()
            .then(product=>{
                if(!product) return res.status(400).json({status:'Failed',error:"Problem with image save"})
                res.json(product);
            })
            .catch(err=> console.log(err))
    })

}

//add stock to existing product
exports.createStock = (req,res)=>{
    Product.findById({_id: req.product._id}).populate('Category', 'name')
        .then(product=>{
            if(!product){
                return res.status(400).json({status:'Failed',error:"Problem with image save"})
            }

            const newStock = {
                size: req.body.size,
                units: req.body.units
            }
            product.stock.push(newStock);
            product.save()
                .then(product=>{
                    if(!product) return res.status(500).json({status:'Failed',error:"Problem whle adding stock"})
                    res.json(product);
                })
                .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))
}

//get product based on productId
exports.getProduct = (req,res)=>{
    req.product.photo= undefined;
    res.status(200).json(req.product);
}

//middleware to optimize image loading
exports.photo = (req,res)=>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType);
        res.send(req.product.photo.data);
    }
}

//delete a product
exports.deleteProduct = (req,res)=>{
    let product = req.product 
    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({status:'Failed',error:"Problem with deleting"})
        }
        res.json({message:'Deleted'})
    })
}

//update a product
exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.maxFileSize = 2 * 1024 * 1024

    form.parse(req,(err,fields,files)=>{
        if(err) return res.status(400).json({status:'Failed',message:"Problem with image file"})

        //updation code
        let product = req.product;
        product = _.extend(product,  fields)

        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type;
        }

        //save to the db
        product.save()
            .then(product=>{
                if(!product) return res.status(400).json({status:'Failed',message:"Problem with product updation"})
                res.json(product);
            })
            .catch(err=> console.log(err))
    })
}

//list all products
exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy? req.query.sortBy : "name"

    Product.find()
        .limit(limit)
        .sort([[sortBy, 'asc']])
        .select('-photo')
        .then(products=>{
            if(products.length == 0) return res.status(200).json({status:'Success',error:"No Product exists"})
            res.json(products)
        })
        .catch(err=>console.log(err))
}

//update stock middleware
exports.updateStock = (req,res,next)=>{
    let updateOperation = req.body.order.products.map(product=>{
        product.map(stock=>{
            return{
                updateOne:{
                    filter: {_id: product.stockId},
                    update: {$inc: {sold: +1, units: -1}}
                }
            }
        })
    })

    Product.bulkWrite(updateOperation,{},(err, products)=>{
        if(err) return res.status(500).json({status:'Failed',message:"Problem while updating stock"})

    })

    next();
}

//get all unique categories
exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct('Category',{},(err,category)=>{
        if(err) return res.status(400).json({status:'Failed',message:"Problem while updating stock"})
        res.json(category)
    })
}