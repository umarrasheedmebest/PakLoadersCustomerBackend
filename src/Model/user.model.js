const db = require('../Utilities/config.db')


class user {

    full_name;
    number;
    user_image;
    is_active;
    is_deleted;
    deleted_at;
    created_at;
    updated_at;

    constructor(obj) {

        this.full_name = obj.full_name,
            this.number = obj.number,
            this.user_image = obj.user_image,
            this.is_active = false,
            this.is_deleted = false,
            this.deleted_at = obj.deleted_at || null,
            this.created_at = obj.created_at || new Date().toISOString().replace("T", " ").split(".")[0],
            this.updated_at = obj.updated_at || null

    }

}


user.signUp = (data, result) => {

    try {

        const query = `insert into register_user set ?`

        db.query(query, data, (err, sqlresult) => {
            if (err) {
                result(err, undefined)
            } else {

                result(undefined, sqlresult)
            }
        })

    } catch (error) {

        result(error, undefined)
    }


}


user.activeProfile = (userId, result) => {

    try {
        const query = `update  register_user set is_active=1 where id= ${userId}`

        db.query(query, (err, sqlresult) => {
            if (err) {
                result(err, undefined)
            } else {

                result(undefined, sqlresult)
            }
        })

    } catch (error) {

        result(error, undefined)
    }

}



user.FindCredendials = (number, result) => {

    try {
        const query = `SELECT register_user.id,register_user.full_name,register_user.number FROM register_user WHERE register_user.number = ${number}`

        db.query(query, (err, sqlresult) => {
            if (err) {
                result(err, undefined)
            } else {

                result(undefined, sqlresult)
            }
        })

    } catch (error) {

        result(error, undefined)
    }


}



user.deleteUser = (userId, result) => {

    try {
        const query = `update  register_user set is_deleted=1, deleted_at='${new Date().toISOString().replace("T"," ").split(".")[0]}' where id= ${userId}`

        db.query(query, (err, sqlresult) => {
            if (err) {
                result(err, undefined)
            } else {

                result(undefined, sqlresult)
            }
        })

    } catch (error) {

        result(error, undefined)
    }

}

user.getUser = (userId, result) => {

    try {
        const query = `SELECT id, full_name, number,user_image, created_at, updated_at, deleted_at FROM register_user WHERE id=${userId} && is_active=1 && is_deleted=0` 

        db.query(query, (err, sqlresult) => {
            if (err) {
                result(err, undefined)
            } else {

                result(undefined, sqlresult)
            }
        })

    } catch (error) {

        result(error, undefined)
    }

}



user.updateUser = (data,userId, result) => {

    try {
        console.log(data);

        const query = `update register_user set `+Object.keys(data).map((key) => `${key} = ?`).join(", ") +` , updated_at='${new Date().toISOString().replace("T"," ").split(".")[0]}' where id=${userId} ` 
        const parameters = Object.values(data).map(value => `${value}`)
        db.query(query, parameters,(err, sqlresult) => {
            if (err) {
                result(err, undefined)
            } else {

                result(undefined, sqlresult)
            }
        })
console.log(query);
    } catch (error) {

        result(error, undefined)
    }

}

module.exports = user
