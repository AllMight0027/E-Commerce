const Category = require('../models/Category');


//category param (middleware)
exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id)
        .then(category=>{
            if(!category) return res.status(400).json({status:'Failed',error:"Category id doesn't exists"})
            req.category = category
            next();
        })
        .catch(err=>console.log(err))
}

exports.getCategory = (req,res)=>{
    res.status(200).json(req.category)
}

exports.postCategory = (req,res)=>{
    const category = new Category(req.body)
    category.save()
        .then(category=>{
            if(!category){
                return res.json({error:'Failed to add category'})
            }
            res.status(200).json(category)
        })
        .catch(err=>console.log(err))
}

exports.getAllCategories = (req,res)=>{
    Category.find()
        .then(categories=>{
            if(categories.length == 0) return res.status(200).json({status:'Success',error:"No Category exists"})
            categories.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));

            res.json(categories)
        })
        .catch(err=>console.log(err))
}

exports.updateCategory = (req,res)=>{
    Category.findByIdAndUpdate(
        {_id: req.category._id},
        {$set: req.body},
        {new: true, useFindAndModify: false}
    )
        .then(category=>{
            res.status(200).json(category)
        })
        .catch(err=>console.log(err))
}

exports.deleteCategory = (req,res)=>{
    Category.findByIdAndDelete({_id: req.category._id})
        .then(category=>{
            return res.status(200).json({status:'Success',message:"Category Deleted"})
        })
        .catch(err=>console.log(err))
}