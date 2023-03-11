const { post } = require('../Model/post.model')
const {sendPushNotification} = require('../Utilities/pushNotifications')

const addPost = (req, res, next) => {
    try {
        const title='Post added'
        const body='Look for customer'
        const userId = req.params.id
        const mobileNumber=req.body.mobileNumber
        const data = req.body;
        const {deviceToken, ...rest}=data
        const imagePath = req.files.map((i) => (i.filename));
        const imgObj = new Object();
        for (let i in imagePath) {
            imgObj['image' + (Number(i) + 1)] = imagePath[i];
        }
        const result = imgObj;
        
        post.checkActivePosts(userId, (err, postsResponse) => {
            if (err) {
                next(err)
            } else {
                if (postsResponse[0].id > 0) {
                    res.status(400).send({ message: "Please Cancel Current Post To Add New." })
                } else {
                    post.addPostImages(result, userId, (err, ImageResponse) => {
                        if (err) {
                            next(err)
                        } else {
                            if (ImageResponse) {
                                post.addPost(rest, ImageResponse.insertId, (err, response) => {
                                    if (err) {
                                        next(err)
                                    } else {
                                        post.checkDeviceToken((err,deviceTokenResponse)=>{
                                            if(err){
                                                next(err)
                                            }else{
                                                const tokens = deviceTokenResponse.map((i) => i.device_token);
                                                for (let i = 0; i < tokens.length; i++) {
                                                  const token = tokens[i];
                                                  sendPushNotification(token, userId, title, body, async (err, notificationResponse) => {
                                                    if (err) {
                                                      next(err);
                                                    } else {
                                                      console.log(`Notification sent to token ${token}:`, notificationResponse);
                                                      if (i === tokens.length - 1) {
                                                        // This is the last iteration of the loop, so send the response to the client
                                                        res.status(200).send({ message: "Post Added Successfully.", data: response });
                                                      }
                                                    }
                                                  });
                                                }
                                            }
                                        })

                                       
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
   
    } catch (error) {
        next(error)
    }
}

const cancelPost = (req, res, next) => {

    try {
        const postId = req.params.id
        if(postId){

            post.cancelPost(postId, (err, cancelresponse) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).send({ message: "Post Cancelled Successfully." })
                }
            })
        }else{
            res.status(404).send({message:"Missing Post ID"})
        }
    } catch (error) {
        next(error)
    }
}

const allPost = (req, res, next) => {

    try {
        const userId = req.params.id
        if(userId){

            post.allPost(userId, (err,response) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).send(response)
                }
            })
        }else{
        res.status(404).send({message:"Missing User ID"})

        }
    } catch (error) {
        next(error)
    }
}

const singlePost = (req, res, next) => {

    try {
        const postId = req.params.id
        if(postId){

            post.singlePost(postId, (err,response) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).send(response)
                }
            })
        }else{
        res.status(404).send({message:"Missing Post ID"})

        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    addPost,
    cancelPost,
    allPost,
    singlePost
}