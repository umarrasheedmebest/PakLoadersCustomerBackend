const db = require('../Utilities/config.db')
class post {
    user_id;
    pickup_address;
    dropoff_address;
    pickup_date;
    pickup_time;
    details;
    loaders;
    image1;
    image2;
    image3;
    image4;
    image5;
    is_active;
    is_cancel;
    cancelled_at;
    created_at;
    updated_at;
    constructor(obj) {
        const date = new Date().toISOString().split("T")[0];
        const time = new Date().toLocaleTimeString().split(" ")[0];
        const currDate = date + " " + time;
        this.user_id=obj.user_id;
        this.pickup_address=obj.pickup_address;
        this.dropoff_address=obj.dropoff_address;
        this.pickup_date=obj.pickup_date;
        this.pickup_time=obj.pickup_time;
        this.details=obj.details;
        this.loaders=obj.loaders;
        this.image1=obj.image1;
        this.image2=objimage2
        this.image3=obj.image3;
        this.image4=obj.image4;
        this.image5=obj.image5;
        this.is_active=true;
        this.is_cancel=false;
        this.cancelled_at=obj.cancelled_at || null;
        this.created_at=obj.created_at || currDate;
        this.updated_at=obj.updated_at || null;
    }
}

post.addPost=(data,postId,result)=>{
    try {
        const query= `update post set  `+ Object.keys(data).map(key=> `${key} = ?`).join(", ") +` 
        ,created_at='${new Date().toISOString().replace("T", " ").split(".")[0]}' where ?`
        const parameters = [...Object.values(data),{id:postId}]
       
        db.query(query,parameters,(err,sqlresult)=>{
            if(err){
                result(err,undefined)
            }else{
                result(undefined,sqlresult)
            }
        })
    } catch (error) {
        result(error,undefined)
    }

}
post.addPostImages=(data,userId,result)=>{
    try {
        const query= `insert into post set ? , user_id=${userId}`;
        db.query(query,data,(err,sqlresult)=>{
            if(err){
                result(err,undefined)
            }else{
                result(undefined,sqlresult)
            }
        })
    } catch (error) {
        result(error,undefined)
    }
}

post.checkActivePosts=(userId,result)=>{
    try {
        const query= `SELECT COUNT(id) as id FROM post WHERE is_active=1 && is_cancel=0 && user_id = ${userId}`;
        db.query(query,(err,sqlresult)=>{
            if(err){
                result(err,undefined)
            }else{
                result(undefined,sqlresult)
            }
        })
    } catch (error) {
        result(error,undefined)
    }
}

post.cancelPost=(postId,result)=>{
    try {
        const query= `UPDATE post SET is_active=0 , is_cancel=1 WHERE id=${postId}`;
        db.query(query,(err,sqlresult)=>{
            if(err){
                result(err,undefined)
            }else{
                result(undefined,sqlresult)
            }
        })
    } catch (error) {
        result(error,undefined)
    }
}

post.allPost=(userId,result)=>{
    try {
        const query= `SELECT * FROM post WHERE user_id = ${userId}`;
        db.query(query,(err,sqlresult)=>{
            if(err){
                result(err,undefined)
            }else{
                result(undefined,sqlresult)
            }
        })
    } catch (error) {
        result(error,undefined)
    }
}

post.singlePost=(postId,result)=>{
    try {
        const query= `SELECT * FROM post WHERE id= ${postId}`;
        db.query(query,(err,sqlresult)=>{
            if(err){
                result(err,undefined)
            }else{
                result(undefined,sqlresult)
            }
        })
    } catch (error) {
        result(error,undefined)
    }
}
module.exports={post}