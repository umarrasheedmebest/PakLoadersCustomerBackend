const router = require('express').Router();
const bidsController = require('../Controller/bids.controller')
const {verifyAccessToken} = require('../Utilities/jwt')

router.get("/get-all/:id",verifyAccessToken,bidsController.allBids);
router.get("/get-single-bid/:id",bidsController.singleBids);

module.exports = router;
