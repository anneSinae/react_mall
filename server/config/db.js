var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'react_test',
    password : '1111',
    database : 'react_test'
});

connection.connect();

connection.query('SELECT * FROM mall_test', function (err, rows, fields) {
    if (err) console.error('mysql connection error :' + err);
    else console.info('mysql is connected successfully.');
    console.log(rows);
});

connection.end();