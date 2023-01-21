const mysql = require('mysql');

// const conn = mysql.createPool({
//   host: "us-cdbr-east-06.cleardb.net",
//   user:"b6812775b5b855",
//   password:"5a8a8dbd",
//   database: "heroku_1f8fedd230d2b92",
//   port: 3306 
// });

// const conn = mysql.createPool({
//   host: "localhost",
//   user:"root",
//   password:"", 
//   database: "pakloaders",
//   port: 3306 
// });

// mysql -hcontainers-us-west-69.railway.app -uroot -pEgtFRv5kLkGM0SlIXz2d --port 7654 --protocol=TCP railway

// const conn = mysql.createPool({
//   host: "containers-us-west-69.railway.app",
//   user:"root",
//   password:"EgtFRv5kLkGM0SlIXz2d", 
//   database: "railway",
//   port: 7654 
// });
// const conn = mysql.createPool({
//   host: "sql6.freemysqlhosting.net",
//   user:"sql6590784",
//   password:"UepK2CveRe", 
//   database: "sql6590784",
//   port: 3306 
// });
// const conn = mysql.createPool({
//   host: "localhost",
//   user:"id20124786_dbpakloaders",
//   password:"CWkGxJ1r6+E6cdBc", 
//   database: "id20124786_pakloaders",
//   port: 3306 
// });
const conn = mysql.createPool({
  host: "localhost",
  user:"root",
  password:"", 
  database: "pakloaders",
  port: 3306 
});
conn.getConnection((err,connection)=>{
  if(err){
    console.error("error connection:" + err.stack)
    return; }
  if(connection){
    console.log("Database Connection established! ")
    connection.release()}
})

module.exports = conn;
