var mysql = require('mysql'),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync(__dirname + '/config.json')),
    connection = mysql.createConnection(config.mysql);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});