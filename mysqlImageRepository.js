var mysql = require('mysql'),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync(__dirname + '/config.json')),
    connection = mysql.createConnection(config.mysql);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end();