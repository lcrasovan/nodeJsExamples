var mysql = require('mysql'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    config = JSON.parse(fs.readFileSync(__dirname + '/config.json')),
    connection = mysql.createConnection(config.mysql);

function processRow(city, name, callback) {
    console.log('Processing ' + name);
    mkdirp('data/' + city, function(error) {});
    mkdirp('data/' + city + '/' + name, function(error) {});
    callback();
}

function findProviderLinksByCityId(cityId) {
    
    var parameters = [],
        city = config.cities[cityId];

    parameters.push(cityId);

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });

    var query = connection.query(config.repository.findProviderLinksByCityId.query, parameters);
    query
        .on('error', function(err) {
            // Handle error, an 'end' event will be emitted after this as well
            throw err;
        })
        .on('fields', function(fields) {
            // the field packets for the rows to follow
        })
        .on('result', function(row) {
            // Pausing the connnection is useful if your processing involves I/O
             connection.pause();
            //
             processRow(city, row[Object.keys(row)[0]], function() {
                 connection.resume();
             });
        })
        .on('end', function() {
            connection.end();
        });
};

module.exports.findProviderLinksByCityId = findProviderLinksByCityId;