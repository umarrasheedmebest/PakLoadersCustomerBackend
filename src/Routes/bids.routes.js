const router = require('express').Router();
const bidsController = require('../Controller/bids.controller')
const {verifyAccessToken} = require('../Utilities/jwt')

router.post("/get-all/:id",bidsController.allBids);

module.exports = router;
