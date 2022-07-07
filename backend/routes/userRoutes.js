const express = require('express');
const { registerUser, authUser, getUserById, updateUserById } = require('../controllers/userControllers');
const router = express.Router();

// Routes for API's go here
router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/getUserById').post(getUserById);
router.route('/updateUserById').post(updateUserById);

module.exports = router;