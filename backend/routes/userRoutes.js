const express = require('express');
const { registerUser, authUser, getUserById, updateUserById, verify, resendVerificationEmail, sendResetPassEmail, verifyPassToken, resetPass} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes for API's go here
router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/getUserById').post(protect, getUserById);
router.route('/updateUserById').post(protect, updateUserById);
router.route('/resendVerificationEmail').post(protect, resendVerificationEmail);
router.route('/verify').post(protect, verify);
router.route('/sendResetPassEmail').post(sendResetPassEmail);
router.route('/resetPass').post(resetPass);
router.route('/verifyPassToken').post(verifyPassToken);

module.exports = router;