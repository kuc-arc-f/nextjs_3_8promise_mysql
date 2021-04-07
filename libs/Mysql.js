//
const mysql = require('promise-mysql');

export default {
  get_connection: async function() {
    let connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      multipleStatements: true
    });
    return connection;
  },    
  
}
