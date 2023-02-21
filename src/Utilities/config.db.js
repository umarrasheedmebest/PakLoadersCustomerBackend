const mysql = require('mysql');

// umer rasheed credentials

// const conn = mysql.createPool({
//   host: "sql6.freemysqlhosting.net",
//   user:"sql6590784",
//   password:"UepK2CveRe", 
//   database: "sql6590784",
//   port: 3306 
// });

// const conn = mysql.createPool({
//   host: "sql12.freemysqlhosting.net",
//   user:"sql12593054",
//   password:"dGc9nax4GF", 
//   database: "sql12593054",
//   port: 3306 
// });

// umer farooq account creds
// const conn = mysql.createPool({
//   host: "sql12.freemysqlhosting.net",
//   user:"sql12595503",
//   password:"T6dVQT7i1u", 
//   database: "sql12595503",
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
