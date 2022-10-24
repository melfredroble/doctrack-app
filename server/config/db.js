const mysql = require('mysql');

config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

let connection = mysql.createConnection(config); 

connection.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  } else {
    console.log('connected successfully to DB.');
  }
});

module.exports ={
  connection : mysql.createConnection(config) 
}; 

