const user = require('../Model/user.model')
const {signUpSchema,signInSchema}=require('../Utilities/validations')
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

const signUp = async(req, res, next)=> {
    const { number , full_name } = req.body;

    try {


const data= await signUpSchema.validateAsync(req.body)
      const data1= new user(data)
      user.FindCredendials(data1.number, async(err,ress1)=>{

        if(err){
          next(err)

        }
        else{

          if(ress1.length === 0){
            const otpResponse = await client.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications.create({
                to: `${number}`,
                channel: "sms", 
            });
        if(otpResponse){
 
          user.signUp(data,(err,ress)=>{

            if(err){

              next(err)
            }
            else{
              res.status(200).send({data:ress.insertId})        
            }
          })
         
         
        }
            
          }
          else{
            next(new Error("Number Already Registered"));
            
          }
        }
      })
       
    } catch (error) {
      console.log("log test",error);

        res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
    }
} 


const signIn = async(req, res, next)=> {
  const { number } = req.body;

  try {

    const data= await signInSchema.validateAsync(req.body)
    const data1= new user(data)

    user.FindCredendials(data1.number, async(err,ress1)=>{

      if(err){
        next(err)

      }
      else{

        
          const otpResponse = await client.verify.v2
          .services(TWILIO_SERVICE_SID)
          .verifications.create({
              to: `${number}`,
              channel: "sms", 
          });

      if(otpResponse){

        res.status(200).send("OTP Sent Successfully")        
       
      }
          
       
       
      }
    })
     
  } catch (error) {
    console.log("log test",error);

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
          
          const userId= req.params.id

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
    verifyOTP,
    signIn
}