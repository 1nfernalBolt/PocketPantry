const express = require('express');
const { addRecipe, removeRecipeById, searchRecipeByName, getRecipes, clearRecipes } = require('../controllers/recipeControllers');
const router = express.Router();

// Routes for API's go here
router.route('/clearRecipes').post(clearRecipes);
router.route('/addRecipe').post(addRecipe);
router.route('/removeRecipeById').post(removeRecipeById);
router.route('/searchRecipeByName').post(searchRecipeByName);
router.route('/getRecipes').post(getRecipes);

module.exports = router;