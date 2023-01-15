const { post } = require('../Model/post.model')

const addPost = (req, res, next) => {
    try {
        const userId = req.params.id
        const data = req.body;
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
                                post.addPost(data, ImageResponse.insertId, (err, response) => {
                                    if (err) {
                                        next(err)
                                    } else {
                                        res.status(200).send({ message: "Post Added Successfully.", data: response })
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
        post.cancelPost(postId, (err, cancelresponse) => {
            if (err) {
                next(err)
            } else {
                res.status(200).send({ message: "Post Cancelled Successfully." })
            }
        })
    } catch (error) {
        next(error)
    }
}

const allPost = (req, res, next) => {

    try {
        const userId = req.params.id
        post.allPost(userId, (err,response) => {
            if (err) {
                next(err)
            } else {
                res.status(200).send(response)
            }
        })
    } catch (error) {
        next(error)
    }
}

const singlePost = (req, res, next) => {

    try {
        const postId = req.params.id
        post.singlePost(postId, (err,response) => {
            if (err) {
                next(err)
            } else {
                res.status(200).send(response)
            }
        })
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