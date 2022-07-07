const asyncHandler = require("express-async-handler");
const Ingredient = require('../models/ingredientModel');
const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");

// Clears a user's pantry
const clearPantry = asyncHandler(async (req, res) => {
    const { UserId } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        user.Pantry = [];
        const updatedUser = await user.save();

        if (updatedUser) {
            res.json({
                UserId: updatedUser._id,
                Pantry: updatedUser.Pantry
            });
        } else {
            res.status(400);
            throw new Error("Unable to clear pantry of user with ID " + _id);
        }
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + _id);
    }
});

// Adds an ingredient to a user's pantry
// If the ingredient already exists, add to the amount
const addIngredient = asyncHandler(async (req,res) => {
    const { UserId, IngredientId, Name, Image, Amount, Unit } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        let ingredientList = user.Pantry;

        // If there are no ingredients in pantry, just add one
        if (ingredientList.length == 0) {
            ingredientList.push({IngredientId,Name,Image,Amount,Unit});
            user.Pantry = ingredientList;

            const updatedUser = await user.save();

            if (updatedUser) {
                res.json({
                    UserId: updatedUser._id,
                    Pantry: updatedUser.Pantry,
                    token: generateToken(user._id),
                });

                return;
            } else {
                res.status(400);
                throw new Error("Unable to update user with ID " + UserId);
            }
        } else {
            // Otherwise, check every ingredient to see if ingredient already exists
            for (let i = 0; i < ingredientList.length; i++) {
                // If we already have the ingredient in our pantry...
                if (ingredientList[i].IngredientId == IngredientId) {
                    // If the units match up...
                    if (ingredientList[i].Unit == Unit) {
                        // Just add more of ingredient to pantry
                        ingredientList[i].Amount += Amount;
                        user.Pantry = ingredientList;

                        const updatedUser = await user.save();

                        if (updatedUser) {
                            res.json({
                                UserId: updatedUser._id,
                                Pantry: updatedUser.Pantry,
                                token: generateToken(user._id),
                            });

                            return;
                        } else {
                            res.status(400);
                            throw new Error("Unable to update user with ID " + UserId);
                        }
                    } else {
                        // TODO: Add functionality for inconsistent units
                    }
                }
            }
            // If no matching ingredient was found in pantry, add it to pantry
            ingredientList.push({IngredientId,Name,Image,Amount,Unit});
            user.Pantry = ingredientList;

            const updatedUser = await user.save();

            if (updatedUser) {
                res.json({
                    UserId: updatedUser._id,
                    Pantry: updatedUser.Pantry,
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
    }
});

// Removes an ingredient from a user's pantry
// If the ingredient already exists, subtracts from the amount of ingredient
const removeIngredient = asyncHandler(async (req,res) => {
    const { UserId, IngredientId, Amount, Unit } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        let ingredientList = user.Pantry;

        // If there are no ingredients in pantry, we cannot remove any ingredient
        if (ingredientList.length == 0) {
            res.status(400);
            throw new Error("Ingredient with ID " + IngredientId + " does not exist in the pantry of the user with ID " + UserId);
        } else {
            // Otherwise, check every ingredient to see if ingredient already exists
            for (let i = 0; i < ingredientList.length; i++) {
                // If we already have the ingredient in our pantry...
                if (ingredientList[i].IngredientId == IngredientId) {
                    // If the units match up...
                    if (ingredientList[i].Unit == Unit) {
                        // If we are removing all of available unit or more, just delete the ingredient from pantry
                        if (ingredientList[i].Amount <= Amount) {
                            ingredientList.splice(i, i+1);
                            console.log(i);
                            console.log(ingredientList);
                            user.Pantry = ingredientList;

                            const updatedUser = await user.save();

                            if (updatedUser) {
                                res.json({
                                    UserId: updatedUser._id,
                                    Pantry: updatedUser.Pantry,
                                    token: generateToken(user._id),
                                });

                                return;
                            } else {
                                res.status(400);
                                throw new Error("Unable to update user with ID " + UserId);
                            }
                        } else {
                            // Else, just subtract the amount of ingredient from pantry
                            ingredientList[i].Amount -= Amount;
                            user.Pantry = ingredientList;

                            const updatedUser = await user.save();

                            if (updatedUser) {
                                res.json({
                                    UserId: updatedUser._id,
                                    Pantry: updatedUser.Pantry,
                                    token: generateToken(user._id),
                                });

                                return;
                            } else {
                                res.status(400);
                                throw new Error("Unable to update user with ID " + UserId);
                            }
                        }
                    } else {
                        // TODO: Add functionality for inconsistent units
                    }
                }
            }
            // If no matching ingredient was found in pantry, we can't remove it
            res.status(400);
            throw new Error("Ingredient with ID " + IngredientId + " does not exist in the pantry of the user with ID " + UserId);
        }
    } else {
        res.status(400);
        throw new Error("Unable to find the user associated with ID " + UserId);
    }
});

// Searches a user's pantry for any ingredients with similar names to a given query
const searchIngredientByName = asyncHandler(async (req,res) => {
    const { UserId, Name } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        let ingredientList = user.Pantry;
        let retList = [];

        for (let i = 0; i < ingredientList.length; i++) {
            if (ingredientList[i].Name.includes(Name)) {
                retList.push(ingredientList[i]);
            }
        }

        res.json({
            UserId: user._id,
            SearchResults: retList
        });
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + _id);
    }
});

// Gets a user's pantry
const getPantry = asyncHandler(async (req, res) => {
    const {UserId} = req.body;
    const user = await User.findById(UserId);

    if (user) {
        res.json({
            UserId: user._id,
            Pantry: user.Pantry
        });
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + _id);
    }
});

module.exports = { clearPantry, addIngredient, removeIngredient, searchIngredientByName, getPantry };
