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

//VERY IMPORTANT - this fails noisy - if key contains percent encoded chars
//like: "%C3%A0_lYlang-Ylang"
//even when trying to use decodeURI or decodeURIComponent, it still does not work
function downloadWithStreams(params) {
   var readStream = s3.getObject(params).createReadStream();
   readStream.pipe(file);
}

// download image into local file in chunks using http
// VERY IMPORTANT - this fails silently if key contains percent encoded chars
// like: "%C3%A0_lYlang-Ylang"
function downloadWithBuffers(params) {
   s3.getObject(params).
   on('httpData', function(chunk) { file.write(chunk); }).
   on('httpDone', function() { file.end(); }).
   send();
}

downloadWithBuffers(params);

