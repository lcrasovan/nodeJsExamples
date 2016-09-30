var size = require('image-size'),
    AWS = require('aws-sdk'),
    fs = require('fs');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json')),
    s3 = new AWS.S3(config.aws.origin),
    bucket = config.aws.bucket,
    samplePhotoKey = config.samplePhotoKey;

//download image to local folder
var params = {Bucket: bucket, Key: samplePhotoKey};
var file = require('fs').createWriteStream(config.localPhotoPath);
//this outputs file into local file
s3.getObject(params).createReadStream().pipe(file);

//download image into local file in chunks using http
s3.getObject(params).
   on('httpData', function(chunk) { file.write(chunk); }).
   on('httpDone', function() { file.end(); }).
   send();