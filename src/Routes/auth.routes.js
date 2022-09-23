const router = require('express').Router();

const authController = require('../Controller/auth.controller')

router.post('/login',authController.login);






module.exports = router;
