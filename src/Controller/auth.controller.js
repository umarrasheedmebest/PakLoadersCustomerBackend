const user = require('../Model/user.model')
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

const signUp = async(req, res, next)=> {
    const { number , full_name } = req.body;

    try {

        const otpResponse = await client.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications.create({
                to: `${number}`,
                channel: "sms",
            });
        if(otpResponse){

          const data= new user(req.body)

          user.signUp(data,(err,ress)=>{

            if(err){
              next(err)
            }
            else{
              res.status(200).send(ress)         
            }
          })
         
        }
    } catch (error) {
        res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
} 

const verifyOTP = async(req, res, next)=> {
    const { number, otp } = req.body;
    try {
        const verifiedResponse = await client.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verificationChecks.create({
                to: `${number}`,
                code: otp,
            });
        if(verifiedResponse) {
          
          const userId= req.body.id

          user.activeProfile(userId,(err,ress)=>{
            if(err){
              next(err)
            }else{
              res.status(200).send(`OTP verified successfully!`);
            }
          })
            
        }
    } catch (error) {
        res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
}
 
module.exports = {
  signUp,
    verifyOTP
}