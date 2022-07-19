const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");

// Clears a user's shopping list
const clearList = asyncHandler(async (req, res) => {
    const { UserId } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        user.Shopping_list = [];
        const updatedUser = await user.save();

        if (updatedUser) {
            res.json({
                _id: updatedUser._id,
                Shopping_list: updatedUser.Shopping_list
            });
        } else {
            res.status(400);
            throw new Error("Unable to clear shopping list of user with ID " + UserId);
        }
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + UserId);
    }
});

// Adds an ingredient to a user's shopping list
// If the ingredient already exists, add to the amount
const addIngredient = asyncHandler(async (req,res) => {
    const { UserId, IngredientId, Name, Image, Amount, Unit } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        let ingredientList = user.Shopping_list;

        // If there are no ingredients in list, just add one
        if (ingredientList.length == 0) {
            ingredientList.push({IngredientId,Name,Image,Amount,Unit});
            user.Shopping_list = ingredientList;

            const updatedUser = await user.save();

            if (updatedUser) {
                res.json({
                    _id: updatedUser._id,
                    Shopping_list: updatedUser.Shopping_list,
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
                // If we already have the ingredient in our list...
                if (ingredientList[i].IngredientId == IngredientId) {
                    // If the units match up...
                    if (ingredientList[i].Unit == Unit) {
                        // Just add more of ingredient to list
                        ingredientList[i].Amount += Amount;
                        user.Shopping_list = ingredientList;

                        const updatedUser = await user.save();

                        if (updatedUser) {
                            res.json({
                                _id: updatedUser._id,
                                Shopping_list: updatedUser.Shopping_list,
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
            // If no matching ingredient was found in list, add it to list
            ingredientList.push({IngredientId,Name,Image,Amount,Unit});
            user.Shopping_list = ingredientList;

            const updatedUser = await user.save();

            if (updatedUser) {
                res.json({
                    _id: updatedUser._id,
                    Shopping_list: updatedUser.Shopping_list,
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

// Removes an ingredient from a user's shopping list
// If the ingredient already exists, subtracts from the amount of ingredient
const removeIngredient = asyncHandler(async (req,res) => {
    const { UserId, IngredientId, Amount, Unit } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        let ingredientList = user.Shopping_list;

        // If there are no ingredients in shopping list, we cannot remove any ingredient
        if (ingredientList.length == 0) {
            res.status(400);
            throw new Error("Ingredient with ID " + IngredientId + " does not exist in the shopping list of the user with ID " + UserId);
        } else {
            // Otherwise, check every ingredient to see if ingredient already exists
            for (let i = 0; i < ingredientList.length; i++) {
                // If we already have the ingredient in our shopping list...
                if (ingredientList[i].IngredientId == IngredientId) {
                    // If the units match up...
                    if (ingredientList[i].Unit == Unit) {
                        // If we are removing all of available unit or more, just delete the ingredient from shopping list
                        if (ingredientList[i].Amount <= Amount) {
                            ingredientList.splice(i, i+1);
                            user.Shopping_list = ingredientList;

                            const updatedUser = await user.save();

                            if (updatedUser) {
                                res.json({
                                    _id: updatedUser._id,
                                    Shopping_list: updatedUser.Shopping_list,
                                    token: generateToken(user._id),
                                });

                                return;
                            } else {
                                res.status(400);
                                throw new Error("Unable to update user with ID " + UserId);
                            }
                        } else {
                            // Else, just subtract the amount of ingredient from list
                            ingredientList[i].Amount -= Amount;
                            user.Shopping_list = ingredientList;

                            const updatedUser = await user.save();

                            if (updatedUser) {
                                res.json({
                                    _id: updatedUser._id,
                                    Shopping_list: updatedUser.Shopping_list,
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
            // If no matching ingredient was found in list, we can't remove it
            res.status(400);
            throw new Error("Ingredient with ID " + IngredientId + " does not exist in the shopping list of the user with ID " + UserId);
        }
    } else {
        res.status(400);
        throw new Error("Unable to find the user associated with ID " + UserId);
    }
});

// Searches a user's list for any ingredients with similar names to a given query
const searchIngredientByName = asyncHandler(async (req,res) => {
    const { UserId, Name } = req.body;

    const user = await User.findById(UserId);

    if (user) {
        let ingredientList = user.Shopping_list;
        let retList = [];

        for (let i = 0; i < ingredientList.length; i++) {
            if (ingredientList[i].Name.includes(Name)) {
                retList.push(ingredientList[i]);
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

// Gets a user's shopping list
const getList = asyncHandler(async (req, res) => {
    const {UserId} = req.body;
    const user = await User.findById(UserId);

    if (user) {
        res.json({
            _id: user._id,
            Shopping_list: user.Shopping_list
        });
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + _id);
    }
});

// Checks / unchecks an item on the shopping list
const checkItemFromList = asyncHandler(async (req, res) => {
    const { UserId, IngredientId, Checked } = req.body;
    const user = await User.findById(UserId);

    if (user) {
        let ingredientList = user.Shopping_list;
        let flag = false;

        for (let i = 0; i < ingredientList.length; i++) {
            if (ingredientList[i].IngredientId == IngredientId) {
                ingredientList[i].Checked = Checked;
                
                user.Shopping_list = ingredientList;
                await user.save();

                res.json({
                    _id: user._id,
                    Shopping_list: user.Shopping_list,
                });

                flag = true;
            }
        }

        if (!flag) {
            throw new Error("Unable to find ingredient by ID " + IngredientId + " in the list of user with ID " + UserId);
        }        
    } else {
        res.status(400);
        throw new Error("Unable to find user by ID " + UserId);
    }
});

module.exports = { clearList, addIngredient, removeIngredient, searchIngredientByName, getList, checkItemFromList };
