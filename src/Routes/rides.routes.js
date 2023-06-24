const router = require('express').Router();
const ridesController = require('../Controller/rides.controller')
const {verifyAccessToken} = require('../Utilities/jwt')

router.post("/accept-bid/:id",ridesController.acceptBid);
router.get("/upcoming/:id",verifyAccessToken,ridesController.upcomingRide);
router.get("/ongoing/:id",verifyAccessToken,ridesController.ongoingRide);

module.exports = router;
