const user = require('../Model/user.model')

const deleteUser = (req, res, next) => {
    try {
        const userId = req.params.id
        if(userId){

            user.deleteUser(userId, (err, deleteResponse) => {
                if (err) {
                    next(err)
                }
                else {
                    res.status(200).send("User Deleted")
                }
            })
        }else{
        res.status(404).send({message:"Missing User ID"})

        }
    } catch (error) {
        next(error)
    }
} 

const getUser = (req, res, next) => {
    try {
        const userId = req.params.id
        if(userId){

            user.getUser(userId, (err, userResponse) => {
                if (err) {
                    next(err)
                }
                else {
                    res.status(200).send(userResponse)
                }
            })
        }else{
        res.status(404).send({message:"Missing User ID"})

        }
    } catch (error) {
        next(error)
    }
}

const updateUser = (req, res, next) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(userId){

            user.updateUser(data, userId, (err, userResponse) => {
                if (err) {
                    next(err)
                }
                else {
                    res.status(200).send("User Updated Successfully")
                }
            })
        }else{
        res.status(404).send({message:"Missing User ID"})

        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    deleteUser,
    getUser,
    updateUser
}