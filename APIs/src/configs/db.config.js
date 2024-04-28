const Sequelize = require('sequelize')
//setup for DB connection
const sequalize =new Sequelize('node-course','root','Mohamedlimo236',{
    dialect:'mysql',  //expicitly telling i'm using Mysql 
    host:'localhost',
    operatorAliases:false
});
//this setup a connection pool 
module.exports = sequalize; 
