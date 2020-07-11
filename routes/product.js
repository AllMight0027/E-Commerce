const express = require('express');
const router = express.Router();

const{isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const{getUserById} = require('../controllers/user');
const{getProductById,createProduct,createStock,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require('../controllers/product');

//middleware to get userId param and populate req.profile
router.param('userId', getUserById);

//middleware to get productId param
router.param('productId', getProductById); 

//add product
router.post('/create/:userId',isSignedIn, isAuthenticated, isAdmin, createProduct);

//add stock
router.post('/stock/:userId/:productId',isSignedIn, isAuthenticated, isAdmin, createStock)

//get product by productId
router.get('/:productId',getProduct);

//get product's photo by photo middleware
router.get('/photo/:productId',photo);

//delete a product
router.delete('/delete/:productId/:userId',isSignedIn, isAuthenticated, isAdmin, deleteProduct);

//update a product
router.put('/update/:productId/:userId',isSignedIn, isAuthenticated, isAdmin, updateProduct);

//get all products
router.get('/', getAllProducts);

router.get('/categories',getAllUniqueCategories);

module.exports = router;