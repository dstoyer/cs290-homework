var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_stoyerd',
//  password        : '!Q@Wpwd4Mydb',
  password        : '8281',
  database        : 'cs290_stoyerd',
  dateStrings     : true
});

module.exports.pool = pool;
