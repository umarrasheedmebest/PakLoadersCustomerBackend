const mysql = require('mysql');

const conn = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user:"b6812775b5b855",
  password:"5a8a8dbd",
  database: "heroku_1f8fedd230d2b92",
  port: 3306 
});
// const conn = mysql.createPool({
//   host: "localhost",
//   user:"root",
//   password:"",
//   database: "pakloaders",
//   port: 3306 
// });
conn.getConnection((err,connection)=>{
  if(err){
    console.error("error connection:" + err.stack)
    return; }
  if(connection){
    console.log("Database Connection established! ")
    connection.release()}
})

module.exports = conn;
