const router = require('express').Router();

const userController = require('../Controller/user.controller')

const {verifyAccessToken} = require('../Utilities/jwt')

router.delete("/delete/:id", userController.deleteUser);

router.get("/get/:id",verifyAccessToken, userController.getUser);

router.put("/update/:id", userController.updateUser);





module.exports = router;
