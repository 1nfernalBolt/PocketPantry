const express = require('express');
const { addRecipe, removeRecipeById, searchRecipeByName, getRecipes, clearRecipes } = require('../controllers/recipeControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes for API's go here
router.route('/clearRecipes').post(protect, clearRecipes);
router.route('/addRecipe').post(protect, addRecipe);
router.route('/removeRecipeById').post(protect, removeRecipeById);
router.route('/searchRecipeByName').post(protect, searchRecipeByName);
router.route('/getRecipes').post(protect, getRecipes);

module.exports = router;