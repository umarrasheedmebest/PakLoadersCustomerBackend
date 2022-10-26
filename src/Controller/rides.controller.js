const {Rides}=require('../Model/rides.model')

const acceptBid=(req,res,next)=>{

    try {
        const bidId= req.params.id
        Rides.acceptBid(bidId,(err,response)=>{
            if(err){
                next(err)
            }else{
                res.status(200).send({rideId:response.insertId})
            }
        })
    } catch (error){
        next(error)
    }
}

acceptBid
module.exports={
    acceptBid
}