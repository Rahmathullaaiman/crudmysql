const mysql = require('mysql2/promise')

const mySqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'HOGrider@123',
    database:'studentdb'

})

module.exports = mySqlPool;