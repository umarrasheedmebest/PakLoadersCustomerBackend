const router = require('express').Router();

const authController = require('../Controller/auth.controller')


router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/verify-otp/:id", authController.verifyOTP);






module.exports = router;
