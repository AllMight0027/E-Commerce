const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product:{
    product: {
      type: ObjectId,
      ref: "Product"
    },
    name:{ 
      type: String
    },
    price: Number,
    _id: ObjectId
  },
  stockId: ObjectId
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User"
    },
    status :{
      type: String,
      default:"Recieved",
      enum: ["Recieved", "Processing", "Shipped", "Delivered", "Cancelled"]
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
