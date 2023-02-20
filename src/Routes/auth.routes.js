const router = require('express').Router();
const authController = require('../Controller/auth.controller')


router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/sign-up/verify-otp", authController.signUpVerifyOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/test-message", authController.testMessage);

module.exports = router;
