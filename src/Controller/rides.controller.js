const {Rides}=require('../Model/rides.model')

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

module.exports={
    acceptBid,
    upcomingRide
}