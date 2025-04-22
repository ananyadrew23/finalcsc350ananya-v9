import mysql from 'mysql2/promise'

let connection

export async function getDB() {
  if (!connection) {
    connection = await mysql.createConnection(process.env.MYSQL_URI)
  }
  return connection
}
