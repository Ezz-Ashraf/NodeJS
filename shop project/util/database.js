const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
	database:'nodestore',
	password:'1234',
	 port: 3360
});
module.exports=pool.promise();