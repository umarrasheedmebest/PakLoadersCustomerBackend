const router = require('express').Router();
const bidsController = require('../Controller/bids.controller')
const {verifyAccessToken} = require('../Utilities/jwt')

router.post("/get-all/:id",verifyAccessToken,bidsController.allBids);

module.exports = router;
