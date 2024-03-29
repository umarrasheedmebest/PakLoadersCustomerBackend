const user = require('../Model/user.model')

const userProfileImage = (req, res, next) => {
    try {
        const id = req.params.id;
        const imagePath = req.files[0].filename;
        user.userProfileImage(imagePath, id, (err, Response) => {
            if (err) {
                next(err)
            } else {
                res.status(200).send({ "Image Name": imagePath, Response })
            }
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    userProfileImage
}