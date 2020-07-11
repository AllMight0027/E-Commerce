const express = require('express');
const router = express.Router();
const{getCategoryById,getCategory, postCategory, getAllCategories, updateCategory, deleteCategory} = require('../controllers/category');
const{isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const{getUserById} = require('../controllers/user');

//middleware to get userId param and populate req.profile
router.param('userId', getUserById);

//middleware to get categoryId param
router.param('categoryId', getCategoryById);

//get category by id
router.get('/:categoryId', getCategory);

//post a category
router.post('/create/:userId',isSignedIn, isAuthenticated, isAdmin, postCategory);

//get all categories
router.get('/', getAllCategories);

//update a category
router.put('/update/:categoryId/:userId',isSignedIn, isAuthenticated, isAdmin, updateCategory);

//dalete a category
router.delete('/delete/:categoryId/:userId',isSignedIn, isAuthenticated, isAdmin, deleteCategory);

module.exports = router;