const mysql = require('mysql');

const conn = mysql.createPool({
  host: "sql6.freemysqlhosting.net",
  user:"sql6528254",
  password:"e46YKuLSQt",
  database: "sql6528254",
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
