var admin = require("firebase-admin");
var fcm = require('fcm-notification');
var serviceAccount = require("./privateFile.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);


sendPushNotification= (token,userId,title,body,result) => {

  try{
      let message = {
          android: {
              notification: {
                  title: title,
                  body: body,
              },
              data: {
                  user_id: userId
                }
          },
token:token,   
};

      FCM.send(message, function(err, resp) {
          if(err){
result(err,undefined)     

}else{
              console.log(resp);
              result(undefined,resp)
          }
      });

  }catch(err){
      throw err;
      }

  }
module.exports={
  sendPushNotification
}