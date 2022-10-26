const router = require('express').Router();
const postController = require('../Controller/post.controller')
const {verifyAccessToken} = require('../Utilities/jwt')
const {upload} = require('../Utilities/upload')

router.post("/add/:id",verifyAccessToken,upload.array('images',5),postController.addPost);
router.get("/cancel/:id",verifyAccessToken,postController.cancelPost);
router.get("/get-all/:id",verifyAccessToken,postController.allPost);
router.get("/get/single-post/:id",verifyAccessToken,postController.singlePost);

module.exports = router;
