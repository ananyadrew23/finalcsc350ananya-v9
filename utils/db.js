const mysql = require('mysql2')
export const mysqlPool = mysql.createPool(process.env.MYSQL_URI)
mysql.createPool(process.env.MYSQL_URI)