const express = require('express');
const router = express.Router();

const {getUser,getUserById,updateUser,userPurchaseList}= require('../controllers/user')
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")


//middleware to get param and populate req.ptofile
router.param('userId', getUserById);

//route to get user by id
router.get('/:userId',isSignedIn,isAuthenticated,getUser)

//route to update user by id
router.put('/:userId',isSignedIn,isAuthenticated,updateUser)

//route to get user's all orders by user id
router.get('/:userId/orders',isSignedIn,isAuthenticated,userPurchaseList)


module.exports = router;