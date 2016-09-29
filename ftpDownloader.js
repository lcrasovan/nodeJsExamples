var ftpClient = require('ftp-client'),
    moment = require('moment'),
    port = 21,
    ftpUserName = 'ftpUserName',
    ftpPassword = 'ftpPassword',
    config = {
        host: 'IP.OF.FTP.HOST',
        port: port,
        user: ftpUserName,
        password: ftpPassword
    },
    ftpFolder = 'yourUploadFolder',
    localDestinationFolder = 'relative/path/to/local/destination/folder', 
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