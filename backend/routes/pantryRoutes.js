const express = require('express');
const { clearPantry, addIngredient, removeIngredient, searchIngredientByName, getPantry } = require('../controllers/pantryControllers');
const router = express.Router();

// Routes for API's go here
router.route('/clearPantry').post(clearPantry);
router.route('/addIngredient').post(addIngredient);
router.route('/removeIngredient').post(removeIngredient);
router.route('/searchIngredientByName').post(searchIngredientByName);
router.route('/getPantry').post(getPantry);

module.exports = router;