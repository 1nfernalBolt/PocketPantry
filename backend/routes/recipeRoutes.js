const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');
const router = express.Router();

// Routes for API's go here
router.route('/register').post(registerUser);
router.route('/login').post(authUser);

module.exports = router;