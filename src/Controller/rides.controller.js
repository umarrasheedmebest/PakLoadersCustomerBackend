const {Rides}=require('../Model/rides.model')
const io = require('socket.io-client');

const acceptBid=(req,res,next)=>{

    try {
        const bidId= req.params.id
        const body='Accepted your bid'
        if(bidId){
            Rides.acceptBid(bidId,(err,response)=>{
                if(err){
                    next(err);
                } else {
                    Rides.driverDeviceToken(bidId,(err,tokenResponse)=> {
                if(err){
                next(err)
                }else{
                    Rides.userName(bidId,(err,userName)=>{
            if(err){
                next(err)
            }else{
    
                const tokens = tokenResponse.map((i) => i.device_token);
                for (let i = 0; i < tokens.length; i++) {
                  const token = tokens[i];
                  sendPushNotification(token, userName[0]?.id, userName[0]?.full_name, body, async (err, notificationResponse) => {
                    if (err) {
                      next(err);
                    } else {
                      console.log(`Notification sent to token ${token}:`, notificationResponse);
                      if (i === tokens.length - 1) {
                        // This is the last iteration of the loop, so send the response to the client
                    res.status(200).send({rideId:response.insertId})
            }
                    }
                  });
                }
                // let delayTime= 1000 * 60 * 60
                
                // setTimeout(()=>{
                //     for (let i = 0; i < tokens.length; i++) {
                //         const token = tokens[i];
                //         sendPushNotification(token, userName[0]?.id,  '3 hours remaining',`Ride with ${userName[0]?.full_name}`, async (err, notificationResponse) => {
                //           if (err) {
                //             next(err);
                //           } else {
                //             console.log(`Notification sent to token ${token}:`, notificationResponse);
                //             if (i === tokens.length - 1) {
                //               // This is the last iteration of the loop, so send the response to the client
                //           res.status(200).send({rideId:response.insertId})
                //   }
                //           }
                //         });
                //       }
                // },delayTime)
            }
        })
    }
                    })
                }
            })
        }else{
        res.status(404).send({message:"Missing required Parameters"})

        }
    } catch (error){
        next(error)
    }
}

const createBid = async(req, res, next)=> {
    try {
        const result = new Bids(req.body);
        const body='Sent you a bid proposal'
        Bids.createBid(result, (err, response)=> {
            if(err){
                next(err);
            } else {
                Bids.userDeviceToken(result.post_id,(err,tokenResponse)=> {
            if(err){
            next(err)
            }else{
    Bids.DriverName(result.driver_id,(err,driverName)=>{
        if(err){
            next(err)
        }else{

            const tokens = tokenResponse.map((i) => i.device_token);
            for (let i = 0; i < tokens.length; i++) {
              const token = tokens[i];
              sendPushNotification(token, result.driver_id, driverName[0].full_name, body, async (err, notificationResponse) => {
                if (err) {
                  next(err);
                } else {
                  console.log(`Notification sent to token ${token}:`, notificationResponse);
                  if (i === tokens.length - 1) {
                    // This is the last iteration of the loop, so send the response to the client
                    res.status(200).send({message: "Bid Placed successfully!"});
                  }
                }
              });
            }
        }
    })
}
                })
            }
        })
    } catch (error) {
        next(error);
    }
}
const upcomingRide=(req,res,next)=>{

    try {
        const userId= req.params.id
        if(userId){
        Rides.upcomingRide(userId,(err,response)=>{
            if(err){
                next(err)
            }else{
                res.status(200).send(response)
            }
        })
    }else{
        res.status(404).send({message:"Missing User ID"})

    }
    } catch (error){
        next(error)
    }
}
const ongoingRide=(req,res,next)=>{

    try {
        const userId= req.params.id
        if(userId){
        Rides.ongoingRide(userId,(err,response)=>{
            if(err){
                next(err)
            }else{
                // io.on('driver_location', (data) => {
                //     if(data.driverId === driverId) {
                //         res.status(200).send({
                //             lat: data.lat,
                //             lng: data.lng
                //         });
                //     }
                // });
                res.status(200).send(response)
            }
        })
    }else{
        res.status(404).send({message:"Missing User ID"})

    }
    } catch (error){
        next(error)
    }
}

module.exports={
    acceptBid,
    upcomingRide,
    ongoingRide
}