const express = require('express');
const { clearList, addIngredient, removeIngredient, searchIngredientByName, getList } = require('../controllers/listControllers');
const router = express.Router();

// Routes for API's go here
router.route('/clearList').post(clearList);
router.route('/addIngredient').post(addIngredient);
router.route('/removeIngredient').post(removeIngredient);
router.route('/searchIngredientByName').post(searchIngredientByName);
router.route('/getList').post(getList);

module.exports = router;