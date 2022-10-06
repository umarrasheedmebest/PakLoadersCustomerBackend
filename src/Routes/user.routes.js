const router = require('express').Router();

const userController = require('../Controller/user.controller')


router.delete("/delete/:id", userController.deleteUser);

router.get("/get/:id", userController.getUser);






module.exports = router;
