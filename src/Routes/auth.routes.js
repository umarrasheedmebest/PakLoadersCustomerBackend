const router = require('express').Router();

const authController = require('../Controller/auth.controller')


router.post("/sign-up/send-otp", authController.signUp);
router.post("/verify-otp", authController.verifyOTP);






module.exports = router;
