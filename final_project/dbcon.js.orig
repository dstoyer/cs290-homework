var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'bob',
  password        : 'bob123',
  database        : 'cs290',
  dateStrings	  : true
});

module.exports.pool = pool;