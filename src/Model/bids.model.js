const db = require('../Utilities/config.db')

class Bids {
    driver_id;
    post_id;
    bid_amount;
    is_active;
    created_at;
    updated_at;
    constructor(obj){
        const date = new Date().toISOString().split("T")[0];
        const time = new Date().toLocaleTimeString().split(" ")[0];
        const currDate = date + " " + time;
        this.driver_id = obj.driver_id;
        this.post_id = obj.post_id;
        this.bid_amount = obj.bid_amount;
        this.is_active = true;
        this.created_at = obj.created_at || new Date().toISOString().replace("T", " ").split(".")[0];
        this.updated_at = obj.updated_at || null;
    }
}

Bids.allBids=(userId,result)=>{

        const query= `SELECT post.id,bids.bid_amount,bids.created_at,register_driver.full_name,register_driver.number,
        register_driver.secondary_number,
        register_driver.driver_image,vehicles_info.name,vehicles_info.vehicle_image2,vehicles_info.vehicle_image1
        FROM bids
        LEFT JOIN register_driver
        ON bids.driver_id=register_driver.id
        LEFT JOIN vehicles_info
        ON register_driver.id=vehicles_info.driver_id
        JOIN post
        ON bids.post_id=post.id
        JOIN register_user
        ON post.user_id=register_user.id
        WHERE post.is_active=1 && post.is_cancel=0 && 
        register_driver.is_active=1 && register_driver.is_deleted=0 && bids.is_active=1 && register_user.id = ${userId}
        `;
        db.query(query,(err,sqlresult)=>{
            if(err){
                result(err,undefined)
            }else{
                result(undefined,sqlresult)
            }
        })
  
}

Bids.singleBids=(bidId,result)=>{
    try {
        const query= `SELECT post.id,bids.bid_amount,bids.created_at,register_driver.full_name,register_driver.number,
        register_driver.secondary_number,
        register_driver.driver_image,vehicles_info.name,vehicles_info.vehicle_image2,vehicles_info.vehicle_image1
        FROM bids
        LEFT JOIN register_driver
        ON bids.driver_id=register_driver.id
        LEFT JOIN vehicles_info
        ON register_driver.id=vehicles_info.driver_id
        JOIN post
        ON bids.post_id=post.id
        JOIN register_user
        ON post.user_id=register_user.id
        WHERE post.is_active=1 && post.is_cancel=0 && 
        register_driver.is_active=1 && register_driver.is_deleted=0 && bids.is_active=1 && bids.id = ${bidId}
        `;
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
module.exports={Bids}