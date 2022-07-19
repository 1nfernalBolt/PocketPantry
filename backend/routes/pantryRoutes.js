const express = require('express');
const { clearPantry, addIngredient, removeIngredient, searchIngredientByName, getPantry } = require('../controllers/pantryControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes for API's go here
router.route('/clearPantry').post(protect, clearPantry);
router.route('/addIngredient').post(protect, addIngredient);
router.route('/removeIngredient').post(protect, removeIngredient);
router.route('/searchIngredientByName').post(protect, searchIngredientByName);
router.route('/getPantry').post(protect, getPantry);

module.exports = router;