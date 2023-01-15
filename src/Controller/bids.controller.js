const {Bids}=require('../Model/bids.model')
const { post } = require('../Routes/post.routes')

const allBids=(req,res,next)=>{
try {
    const userId=req.params.id
    Bids.allBids(userId,(err,bidsResponse)=>{
        if(err){
            next(err)
        }else{
            res.status(200).send(bidsResponse)
        }
    })
} catch (error) {
    next(error)
}
}
const singleBids=(req,res,next)=>{
    try {
        const bidId=req.params.id
        Bids.singleBids(bidId,(err,bidsResponse)=>{
            if(err){
                next(err)
            }else{
                res.status(200).send(bidsResponse)
            }
        })
    } catch (error) {
        next(error)
    }
    }
module.exports={
    allBids,
    singleBids
}