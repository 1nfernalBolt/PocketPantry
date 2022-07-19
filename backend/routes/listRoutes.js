const express = require('express');
const { clearList, addIngredient, removeIngredient, searchIngredientByName, getList, checkItemFromList } = require('../controllers/listControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes for API's go here
router.route('/clearList').post(protect, clearList);
router.route('/addIngredient').post(protect, addIngredient);
router.route('/removeIngredient').post(protect, removeIngredient);
router.route('/searchIngredientByName').post(protect, searchIngredientByName);
router.route('/getList').post(protect, getList);
router.route('/checkItemFromList').post(protect, checkItemFromList);

module.exports = router;