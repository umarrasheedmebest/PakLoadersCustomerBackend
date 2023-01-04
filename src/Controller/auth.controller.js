const user = require('../Model/user.model')
const { signAccessToken, signRefreshToken } = require('./../Utilities/jwt')
const { signUpSchema, signInSchema } = require('../Utilities/validations')
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true
});

const signUp = async (req, res, next) => {
  const { number, full_name } = req.body;
  try {
    const data = await signUpSchema.validateAsync(req.body)
    const dataObj = new user(data)
    user.FindCredendials(dataObj.number, async (err, response) => {
      if (err) {
        next(err)
      }
      else {
        if (response.length === 0) {
          const otpResponse = await client.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications.create({
              to: `${number}`,
              channel: "sms",
            });
          if (otpResponse) {
          
            user.signUp(dataObj, (err, signUpResponse) => {
              if (err) {
                next(err)
              }
              else {
                res.status(200).send({ message: "Please Verify OTP", data: signUpResponse.insertId })
              }
            })
          }
        }
        else {
          next(new Error("Number Already Registered"));
        }
      }
    })
  }
  catch (error) {
    res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
  }
}

const signIn = async (req, res, next) => {
  const { number } = req.body;
  try {
    const data = await signInSchema.validateAsync(req.body)
    const dataObj = new user(data)
    user.FindCredendials(dataObj.number, async (err, Response) => {
      if (err) {
        next(err)
      }
      else {
        if (Response.length === 0) {
          next(new Error("Number Not Registered"))
        }
        else {
          const otpResponse = await client.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications.create({
              to: `${number}`,
              channel: "sms",
            });
          if (otpResponse) {
            res.status(200).send({ message: "OTP Sent Successfully", ID: Response[0].id })
          }
        }
      }
    })
  }
  catch (error) {
    res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
  }
}

const signUpVerifyOTP = async (req, res, next) => {
  const { number, otp } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `${number}`,
        code: otp,
      });
    if (verifiedResponse) {
      const userId = req.params.id
      user.activeProfile(userId, async (err, response) => {
        if (err) {
          next(err)
        }
        else {
          const accessToken = await signAccessToken(userId);
          res.cookie('accessToken', `bearer ${accessToken}`, {
            httpOnly: false,
            path: '/',
            maxAge: 60*60*60*60*1000
          });
          res.status(200).send({ message: "OTP Verified Successfully", response, accessToken: `bearer ${accessToken}` });
        }
      })
    }
  }
  catch (error) {
    res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
  }
}

const verifyOTP = async (req, res, next) => {
  const { number, otp } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `${number}`,
        code: otp,
      });
    if (verifiedResponse) {
      const userId = req.params.id
      const accessToken = await signAccessToken(userId);
      res.cookie('accessToken', `bearer ${accessToken}`, {
        httpOnly: false,
        path: '/',
        maxAge: 60*60*60*60*1000
      });
      res.status(200).send({ message: "OTP Verified Successfully", accessToken: `bearer ${accessToken}` });
    }
  }
  catch (error) {
    res.status(error?.status || 400).send(error?.message || 'Something went wrong!');
  }
}

module.exports = {
  signUp,
  signUpVerifyOTP,
  verifyOTP,
  signIn
}