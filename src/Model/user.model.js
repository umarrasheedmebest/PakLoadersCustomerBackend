const db= require ('../Utilities/config.db')


class user {

    full_name;
    number;
    secondary_number;
    user_image;
    is_active;
    is_deleted;
    deleted_at;
    created_at;
    updated_at;

    constructor(obj){

        this.full_name=obj.full_name,
        this.number=obj.number,
        this.secondary_number=obj.secondary_number,
        this.user_image=obj.user_image,
        this.is_active=false,
        this.is_deleted=false,
        this.deleted_at=obj.deleted_at || null ,
        this.created_at=obj.created_at || new Date().toISOString().replace("T", " ").split(".")[0],
        this.updated_at=obj.updated_at || null



    }

}
user.signUp=(data,result)=>{

try {
const query=  `insert into register_user set ?`

db.query(query, data,(err,sqlresult)=>{
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
user.activeProfile=(userId,result)=>{

    try {
    const query=  `update into register_user set is_active=1 where id= ${userId}`
    
    db.query(query, data,(err,sqlresult)=>{
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
module.exports= user
// login query here