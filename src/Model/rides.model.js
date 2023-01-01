const db = require('../Utilities/config.db')

class Rides {
    bid_id;
    ride_start_time;
    ride_end_time;
    ongoing;
    upcoming;
    completed;
    cancelled;
    is_active;
    created_at;
    constructor(obj) {
        const date = new Date().toISOString().split("T")[0];
        const time = new Date().toLocaleTimeString().split(" ")[0];
        const currDate = date + " " + time;
        this.bid_id = obj.bid_id;
        this.ride_start_time = obj.ride_start_time;
        this.ride_end_time = obj.ride_end_time;
        this.ongoing = obj.ongoing;
        this.upcoming = obj.upcoming;
        this.completed = obj.completed;
        this.is_active = true;
        this.created_at = obj.created_at || new Date().toISOString().replace("T", " ").split(".")[0];
    }
}


Rides.acceptBid = (bidId, result) => {
    try {

        db.getConnection((err, conn) => {
            if (err) {
                result(err, undefined)
            } else {
                conn.beginTransaction((err) => {
                    if (err) {
                        conn.rollback(() => {
                            conn.release();
                            result(err, undefined)
                        })
                    } else {
                        let query = `update bids b
                        JOIN post p 
                        ON b.post_id=p.id
                        set b.is_active = 0 , p.is_active= 0 where b.id= ${bidId}`
                        conn.query(query, (err, bidsResult) => {
                            if (err) {
                                conn.rollback(() => {
                                    conn.release();
                                    result(err, undefined)
                                })
                            } else {
                                const date = new Date().toISOString().split("T")[0];
                                const time = new Date().toLocaleTimeString().split(" ")[0];
                                const currDate = date + " " + time;
                                query = `insert into rides set bid_id=${bidId},upcoming = 1 , created_at= '${currDate}'`
                                console.log(query);
                                conn.query(query, (err, ridesResult) => {
                                    if (err) {
                                        conn.rollback(() => {
                                            conn.release();
                                            result(err, undefined)
                                        })
                                    } else {

                                        conn.commit((err) => {
                                            if (err) {
                                                conn.rollback(() => {
                                                    conn.release();
                                                    result(err, undefined)
                                                })
                                            } else {
                                                conn.release();
                                                result(undefined, ridesResult)
                                            }
                                        })
                                    }

                                })
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        result(error, undefined)
    }
}

Rides.upcomingRide = (userId, result) => {
    try {
        const query = `SELECT post.pickup_address,post.dropoff_address,post.pickup_date,post.pickup_time,
        post.image1,post.image2,bids.bid_amount
        FROM rides
        JOIN bids
        ON rides.bid_id=bids.id
        JOIN post
        ON bids.post_id=post.id
        WHERE post.user_id= ${userId} && rides.upcoming = 1`
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
module.exports = {
    Rides
}