const router = require('express').Router();
const authController = require('../Controller/auth.controller')
const fetch = require('node-fetch')
router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/sign-up/verify-otp", authController.signUpVerifyOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/test-message", authController.testMessage);

// router.post("/notifications",(req,res)=>{
//     var notification ={
//         'title':'test notification',
//         'text':'test notification text'
//     }

//     var fcm_tokens=[]

//     var notification_body={
//         'notification':notification,
//         'registration_ids':fcm_tokens
//     }

//     fetch('https://fcm.googleapis.com/fcm/send', {

//     method: 'POST',
//     headers: {
//         'Authorization': 'key='+'BH-JvbzTTaUymkesd9YO-bqjFLjhGrAKNdzq9IZc33hc36kmsSBsq7kafDYoIG-61yofGpN5uhOM4oCf4c0rWB0',
//   'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(notification_body),
//     }).then(()=>{
// res.status(200).send("Notication send successfully");
//     }).catch((err)=>{
//         res.status(400).send("Something went wrong");
// console.log(err);
//     })
// });

module.exports = router;
