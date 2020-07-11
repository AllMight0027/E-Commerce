const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const productSchema= Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    category:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price:{
        type: Number,
        required: true,
    },
    stock:[
        {
            size:{
                type: String,
            },
            units:{
                type: Number
            },
            sold:{
                type: Number,
                default: 0
            }
        }
    ],
    photo:{
        data: Buffer,
        contentType: String
    }
},
{timestamps: true})

module.exports = Product = mongoose.model('Product',productSchema);