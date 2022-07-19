
const express = require('express');
const { clearPantry, addIngredient, removeIngredient, searchIngredientByName, getPantry } = require('../controllers/pantryControllers');
const { protect } = require('../middlewares/authMiddleware');
router = express.Router();

// Routes for API's go here
router.route('/clearPantry').post(protect, clearPantry);
router.route('/addIngredient').post(protect, addIngredient);
router.route('/removeIngredient').post(protect, removeIngredient);
router.route('/searchIngredientByName').post(protect, searchIngredientByName);
router.route('/getPantry').post(protect, getPantry);

const express = require('express');
const { clearPantry, addIngredient, removeIngredient, searchIngredientByName, getPantry } = require('../controllers/pantryControllers');
router = express.Router();

// Routes for API's go here
router.route('/clearPantry').post(clearPantry);
router.route('/addIngredient').post(addIngredient);
router.route('/removeIngredient').post(removeIngredient);
router.route('/searchIngredientByName').post(searchIngredientByName);
router.route('/getPantry').post(getPantry);

module.exports = router;