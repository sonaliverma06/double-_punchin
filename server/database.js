var mysql = require("mysql")
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


var pool = null;

module.exports = function () {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }
  return pool;
};