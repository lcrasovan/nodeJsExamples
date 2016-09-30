var ftpClient = require('ftp-client'),
    fs = require('fs'),
    config = fs.readFileSync(__dirname + 'config.json'),
    moment = require('moment'),
    port = config.ftp.port,
    host = config.ftp.host,
    ftpUserName = config.ftp.userName,
    ftpPassword = config.ftp.password,
    config = {
        host: host,
        port: port,
        user: ftpUserName,
        password: ftpPassword
    },
    ftpFolder = config.ftp.srcFolder,
    localDestinationFolder = config.ftp.destinationFolderPath, 
    options = {
        logging: 'basic'
    },
    client = new ftpClient(config, options);

client.connect(function () {
    var yesterdayDatePattern = moment().subtract(1, 'days').format('YYYY\-MM\-DD');
    client.download(ftpFolder, localDestinationFolder, {
        overwrite: 'all',
        fileNamePattern: yesterdayDatePattern
    }, function (result) {
        console.log(result);
    });
});