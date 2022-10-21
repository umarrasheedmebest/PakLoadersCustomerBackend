const user= require('../Model/user.model')


const deleteUser=(req,res,next)=>{

try {
    
const userId=req.params.id

user.deleteUser(userId,(err,deleteResponse)=>{

    if(err){
        next(err)
    }
    else{

        res.status(200).send("User Deleted")
    }

})


} catch (error) {

    next(error)
    
}

}


const getUser=(req,res,next)=>{

    try {
        
    const userId=req.params.id
    
    user.getUser(userId,(err,userResponse)=>{
    
        if(err){
            next(err)
        }
        else{
    
            res.status(200).send(userResponse)
        }
    
    })
    
    
    } catch (error) {
    
        next(error)
        
    }
    
    }


    
const updateUser=(req,res,next)=>{

    try {
        
    const userId=req.params.id
    const data= req.body
    user.updateUser(data,userId,(err,userResponse)=>{
    
        if(err){
            next(err)
        }
        else{
    
            res.status(200).send("User Updated Successfully")
        }
    
    })
    
    
    } catch (error) {
    
        next(error)
        
    }
    
    }


    
module.exports={

    deleteUser,
    getUser,
    updateUser
}