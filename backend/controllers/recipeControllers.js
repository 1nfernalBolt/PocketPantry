const asyncHandler = require("express-async-handler");
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");

// Clears a user's saved recipes
const clearRecipes = asyncHandler(async (req, res) => {
    const { UserId } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        user.Saved_recipes = [];
        const updatedUser = await user.save();

        if (updatedUser) {
            res.json({
                _id: updatedUser._id,
                Saved_recipes: updatedUser.Saved_recipes
            });
        } else {
            res.status(400);
            throw new Error("Unable to clear saved recipes of user with ID " + UserId);
        }
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + UserId);
    }
});

// Adds a recipe to a user's saved recipes
const addRecipe = asyncHandler(async (req,res) => {
    const { UserId, RecipeId, Name, Image } = req.body;

    const user = await User.findById(UserId);

    /*if (user) {
        let recipeList = user.Saved_recipes;

        // If there are no recipes saved, just add one
        if (recipeList.length == 0) {
            recipeList.push({RecipeId,Name,Image});
            user.Saved_recipes = recipeList;

            const updatedUser = await user.save();

            if (updatedUser) {
                res.json({
                    _id: updatedUser._id,
                    Saved_recipes: updatedUser.Saved_recipes,
                    token: generateToken(user._id),
                });

                return;
            } else {
                res.status(400);
                throw new Error("Unable to update user with ID " + UserId);
            }
        } else {
            // Otherwise, check every recipe to see if the recipe already exists
            for (let i = 0; i < recipeList.length; i++) {
                // If we already have the recipe saved, we cannot save it again
                if (recipeList[i].RecipeId == RecipeId) {
                    res.status(400);
                    throw new Error("Recipe with ID " + RecipeId + " already exists in the saved recipes of the user with ID " + UserId);
                }
            }
            // If no matching recipe was found, add it
            recipeList.push({RecipeId,Name,Image});
            user.Saved_recipes = recipeList;

            const updatedUser = await user.save();

            if (updatedUser) {
                res.json({
                    _id: updatedUser._id,
                    Saved_recipes: updatedUser.Saved_recipes,
                    token: generateToken(user._id),
                });

                return;
            } else {
                res.status(400);
                throw new Error("Unable to update user with ID " + UserId);
            }
        }
    } else {
        res.status(400);
        throw new Error("Unable to find the user associated with ID " + UserId);
    }*/
    res.json({});
});

// Removes a recipe from a user's saved recipes
const removeRecipeById = asyncHandler(async (req,res) => {
    const { UserId, RecipeId } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        let recipeList = user.Saved_recipes;

        // If there are no recipes saved, we cannot remove recipes
        if (recipeList.length == 0) {
            res.status(400);
            throw new Error("Recipe with ID " + RecipeId + " does not exist in the saved recipes of the user with ID " + RecipeId);
        } else {
            // Otherwise, check every recipe to see if recipe exists
            for (let i = 0; i < recipeList.length; i++) {
                // If we have the recipe saved...
                if (recipeList[i].RecipeId == RecipeId) {
                    recipeList.splice(i, i+1);
                    user.Saved_recipes = recipeList;

                    const updatedUser = await user.save();

                    if (updatedUser) {
                        res.json({
                            _id: updatedUser._id,
                            Saved_recipes: updatedUser.Saved_recipes,
                            token: generateToken(user._id),
                        });

                        return;
                    } else {
                        res.status(400);
                        throw new Error("Unable to update user with ID " + UserId);
                    }
                }
            }
            // If no matching recipe was found, we can't remove it
            res.status(400);
            throw new Error("Recipe with ID " + RecipeId + " does not exist in the saved recipes of the user with ID " + UserId);
        }
    } else {
        res.status(400);
        throw new Error("Unable to find the user associated with ID " + UserId);
    }
});

// Searches a user's saved recipes for any recipes with similar names to a given query
const searchRecipeByName = asyncHandler(async (req,res) => {
    const { UserId, Name } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        let recipeList = user.Saved_recipes;
        let retList = [];

        for (let i = 0; i < recipeList.length; i++) {
            if (recipeList[i].Name.includes(Name)) {
                retList.push(recipeList[i]);
            }
        }

        res.json({
            _id: user._id,
            SearchResults: retList
        });
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + _id);
    }
});

// Gets a user's saved recipes
const getRecipes = asyncHandler(async (req, res) => {
    const {UserId} = req.body;
    const user = await User.findById(UserId);

    if (user) {
        res.json({
            _id: user._id,
            Saved_recipes: user.Saved_recipes
        });
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + _id);
    }
});

module.exports = { clearRecipes, addRecipe, removeRecipeById, searchRecipeByName, getRecipes };
