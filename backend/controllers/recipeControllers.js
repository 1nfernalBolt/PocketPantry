const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");

// Register user API function
const registerUser = asyncHandler(async (req,res) => {
    const { First_name, Last_name, Email, Password } = req.body;

    const userExists = await User.findOne({Email});

    if (userExists) {
        res.status(400)
        throw new Error('User already exists by email');
    }

    const Saved_recipes = [];
    const Shopping_list = [];
    const Pantry = [];

    const user = await User.create({
        First_name,
        Last_name,
        Email,
        Password,
        Saved_recipes,
        Shopping_list,
        Pantry,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            First_name: user.First_name,
            Last_name: user.Last_name,
            Email: user.Email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Unable to register user");
    }
});

// Authenticate user API function
const authUser = asyncHandler(async (req,res) => {
    const { Email, Password } = req.body;

    const user = await User.findOne({ Email });

    if (user && (await user.matchPassword(Password))) {
        res.json({
            _id: user._id,
            First_name: user.First_name,
            Last_name: user.Last_name,
            Email: user.Email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid login credentials");
    }
});

module.exports = {registerUser, authUser};