const express = require('express')
const router = express.Router();

const{isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const{getUserById, pushOrderInPurchaseList} = require('../controllers/user');
const{updateStock} = require('../controllers/product');
const {getOrderById, postOrder, getAllOrders, updateSatus, getOrderStatus, getOrder} = require('../controllers/order')

//middleware to get userId param and populate req.profile
router.param('userId', getUserById);

//middleware to get orderId param
router.param('orderId', getOrderById); 

//post an order
router.post('/create/:userId', isSignedIn, isAuthenticated, pushOrderInPurchaseList, postOrder)

//get all orders
router.get('/all/:userId', isSignedIn, isAuthenticated, isAdmin, getAllOrders)

//get all orders
router.get('/:orderId/detail/:userId', isSignedIn, isAuthenticated, isAdmin, getOrder)

//get status of order
router.get('/status/:userId', isSignedIn, isAuthenticated, isAdmin, getOrderStatus)

//update status
router.put('/:orderId/status/:userId', isSignedIn, isAuthenticated, isAdmin, updateSatus)


module.exports = router;