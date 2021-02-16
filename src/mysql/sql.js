const mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'covid-19',
  });
  //db.connect();
  module.exports = {db};