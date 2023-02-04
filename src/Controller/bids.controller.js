const {Bids}=require('../Model/bids.model')
const { post } = require('../Routes/post.routes')

const allBids=(req,res,next)=>{
try {
    const userId=req.params.id
    if(userId){
        Bids.allBids(userId,(err,bidsResponse)=>{
            if(err){
                next(err)
            }else{
                res.status(200).send(bidsResponse)
            }
        })
    }else{
        res.status(400).send({ error: "Missing required parameter" });
    }

} catch (error) {
    next(error)
}
}


const singleBids=(req,res,next)=>{
    try {
        const bidId=req.params.id
        if(bidId){

            Bids.singleBids(bidId,(err,bidsResponse)=>{
                if(err){
                    next(err)
                }else{
                    res.status(200).send(bidsResponse)
                }
            })
        }else{
        res.status(404).send({message:"Missing required Parameters"})

        }
    } catch (error) {
        next(error)
    }
    }
module.exports={
    allBids,
    singleBids
}