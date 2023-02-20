const {Rides}=require('../Model/rides.model')
const io = require('socket.io-client');
// const socket = io.connect('http://localhost:5002')

const acceptBid=(req,res,next)=>{

    try {
        const bidId= req.params.id
        if(bidId){
            Rides.acceptBid(bidId,(err,response)=>{
                if(err){
                    next(err)
                }else{
                    
                    res.status(200).send({rideId:response.insertId})
                }
            })
        }else{
        res.status(404).send({message:"Missing required Parameters"})

        }
    } catch (error){
        next(error)
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