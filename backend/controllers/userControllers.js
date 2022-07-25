const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const VerifyToken = require('../models/verificationTokenModel');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const { TokenExpiredError } = require("jsonwebtoken");

// Register user API function
const registerUser = asyncHandler(async (req,res) => {
    const { First_name, Last_name, Email, Password } = req.body;

    const userExists = await User.findOne({Email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists by email');
    }

    const Saved_recipes = [];
    const Shopping_list = [];
    const Pantry = [];
    const Verified = false;

    const user = await User.create({
        First_name,
        Last_name,
        Email,
        Password,
        Verified,
        Saved_recipes,
        Shopping_list,
        Pantry,
    });

    let rand = Math.floor((Math.random() * 8999) + 1000);
    const token = await VerifyToken.create({
        UserId: user._id,
        Token: rand,
    });
    await token.save();

    //const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.Token}`

    await sendEmail(user.Email, "Verify your Pocket Pantry account", "Thank you for joining Pocket Pantry! Please use this code to verify your email: " + rand);

    if (user) {
        res.status(201).json({
            _id: user._id,
            First_name: user.First_name,
            Last_name: user.Last_name,
            Email: user.Email,
            token: generateToken(user._id),
            message: "User created, an email has been sent requesting verification"
        });
    } else {
        res.status(400);
        throw new Error("Unable to register user");
    }
});

// Resends verification email to an existing user
const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { Email } = req.body;

    const user = await User.findOne({Email: Email});

    if (!user) {
        res.status(400);
        throw new Error("User does not exist, cannot send email");
    }

    if (user.Verified) {
        res.status(400);
        throw new Error("User is already verified");
    }

    let existingToken = VerifyToken.findOne({UserId: user._id});

    if (existingToken) {
        await VerifyToken.findOneAndDelete({UserId: user._id});
    }

    let rand = Math.floor((Math.random() * 8999) + 1000);
    const token = await VerifyToken.create({
        UserId: user._id,
        Token: rand,
    });
    await token.save();

    //const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.Token}`

    await sendEmail(user.Email, "Verify your Pocket Pantry account", "Thank you for joining Pocket Pantry! Please use this code to verify your email: " + rand);

    res.status(201).json({
        message: "Verification email sent to user"
    });
})

// Verifies a user
const verify = asyncHandler(async (req, res) => {
    try {
        const {UserId, Token} = req.body;

        const user = await User.findOne({_id: UserId});
        if (!user) return res.status(400).send({message: "User does not exist by ID " + UserId});

        const token = await VerifyToken.findOne({
            UserId: user._id
        });

        if (!token) return res.status(400).send({message: "User does not have any valid token saved"});

        if (await token.matchToken(Token)) {
            user.Verified = true;
            await user.save();
            await VerifyToken.findOneAndDelete({UserId: user._id});

            res.status(200).send({message: "Email verified successfully"});
        } else {
            res.status(400).send({message: "Incorrect token provided"});
        }
    } catch (error) {
        res.status(500).send({message: "Internal server error"});
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
            Verified: user.Verified,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid login credentials");
    }
});

// Gets a user by a given ID
const getUserById = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const user = await User.findById(_id);

    if (user) {
        res.json({
            _id: user._id,
            First_name: user.First_name,
            Last_name: user.Last_name,
            Email: user.Email,
            Verified: user.Verified,
            Saved_recipes: user.Saved_recipes,
            Shopping_list: user.Shopping_list,
            Pantry: user.Pantry,
        });
    } else {
        res.status(400);
        throw new Error("No user found with id " + _id);
    }
});

// Updates a user with a given ID
// Password must come in already hashed
const updateUserById = asyncHandler(async (req, res) => {
    const { _id, First_name, Last_name } = req.body;

    const user = await User.findByIdAndUpdate(_id, {First_name, Last_name});

    if (user) {
        res.json({
            _id: user._id,
            First_name: First_name,
            Last_name: Last_name,
            Email: user.Email,
        });
    } else {
        res.status(400);
        throw new Error("No user found with id " + _id + ", or otherwise unable to update");
    }
});

// Sends an email with a link to reset password
const sendResetPassEmail = asyncHandler(async (req, res) => {
    try {
        const {Email} = req.body;
        
        const user = await User.findOne({Email: Email});

        if (!user) {
            res.status(400);
            throw new Error("User does not exist, cannot send email");
        }

        let oldToken = await VerifyToken.findOne({
            UserId: user._id
        });

        if (oldToken) {
            await oldToken.delete();
        }

        let rand = Math.floor((Math.random() * 8999) + 1000);
        const token = await VerifyToken.create({
            UserId: user._id,
            Token: rand,
        });
        await token.save();

        //const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.Token}`

        await sendEmail(user.Email, "Reset password for Pocket Pantry", "Use this code to reset your password: " + rand);

        res.status(201).json({
            UserId: user._id,
            Token: generateToken(user._id),
            message: "Reset password email sent to user"
        });
    } catch (error) {
        res.status(400);
        throw new Error("Unable to send email");
    }
});

// Verifies password reset token
const verifyPassToken = asyncHandler(async (req, res) => {
    try {
        const {UserId, Token} = req.body;


        const user = await User.findOne({UserId: UserId});
        if (!user) {
            res.status(400);
            res.json({message: "Invalid user ID"});
        }

        const token = await VerifyToken.findOne({
            UserId: UserId,
        });

        if (!token) {
            res.status(400)
            res.json({message: "Token invalid, no token for user found"});
        } else {
            if (await token.matchToken(Token)) {
                res.status(200);
                res.json({message: "Token valid"});
            } else {
                res.status(400);
                res.json({message: "Token invalid, incorrect code"});
            }
        }
    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
});

// Resets password
const resetPass = asyncHandler(async (req, res) => {
    try {
        const {UserId, Password} = req.body;

        const user = await User.findOne({_id: UserId});
        if (!user) return res.status(400).send({message: "Invalid user ID"});

        user.Password = Password;
        await user.save();

        let oldToken = await VerifyToken.findOne({
            UserId: UserId
        });

        await oldToken.delete();

        res.status(200).json({
            message: "User password updated successfully"
        });
    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
});

module.exports = {registerUser, authUser, getUserById, updateUserById, verify, resendVerificationEmail, verifyPassToken, sendResetPassEmail, resetPass};
