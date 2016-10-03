var ftpClient = require('ftp-client'),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync(__dirname + '/config.json')),
    moment = require('moment'),
    minimist = require('minimist'),
    port = config['ftp']['port'],
    host = config['ftp']['host'],
    ftpUserName = config['ftp']['userName'],
    ftpPassword = config['ftp']['password'],
    ftpFolder = config['ftp']['srcFolder'],
    localDestinationFolder = config['ftp']['destinationFolderPath'],
    config = {
        host: host,
        port: port,
        user: ftpUserName,
        password: ftpPassword
    },
    knownOptions = {
        string: 'daysBefore',
        default: { daysBefore: 1 },
        logging: 'basic'
    },
    options = minimist(process.argv.slice(2), knownOptions),
    client = new ftpClient(config, options);

client.connect(function () {

    console.log(options);

    var datePattern = moment().subtract(options.daysBefore, 'days').format('YYYY\-MM\-DD');

    client.download(ftpFolder, localDestinationFolder, {
        overwrite: 'all',
        fileNamePattern: datePattern
    }, function (result) {
        console.log(result);
    });
});