const router = require('express').Router();
const imageController = require('../Controller/image.controller')
const {upload} = require('../Utilities/upload')
const {verifyAccessToken} = require('../Utilities/jwt')

router.put("/upload/:id",upload.array('images',1),imageController.userProfileImage);

module.exports = router;
