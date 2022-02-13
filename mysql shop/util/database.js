/* Mysql 2 connection
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
	database:'nodestore',
	password:'1234',
	 port: 3360
});
module.exports=pool.promise(); */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodestore','root','1234',{
dialect:'mysql',
host:'localhost',
port: 3360
});
module.exports=sequelize;