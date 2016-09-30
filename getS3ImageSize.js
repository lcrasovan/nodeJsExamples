var AWS = require('aws-sdk'),
    gm = require('gm').subClass({imageMagick: true}),
    fs = require('fs');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json')),
    s3 = new AWS.S3(config.aws.origin),
    bucket = config.aws.bucket,
    minimumLimitSize = config.maximumLimitSize,
    maxKeys = config.maxKeys,
    minWidth = config.minWidth,
    pathToPhotosWithPrefix = config.pathToPhotosWithPrefix,
    params = {
        Bucket: bucket, /* required */
        Delimiter: '',
        EncodingType: 'url',
        Marker: '',
        MaxKeys: maxKeys,
        Prefix: pathToPhotosWithPrefix
    };

function showImageDimensions(params) {
    var readStream = s3.getObject(params).createReadStream();

    gm(readStream).size(
        {bufferStream: true},
        function(err, size) {
            if (err) {
                console.log(err, err.stack);
            } else {
                if (size.width < minWidth) {
                    console.log('Possible small image:' +
                        params['Key'] + ' | dimensions: ' +
                        size.width +
                        'x' +
                        size.height
                    );
                }
            }
        }
    );
};

s3.listObjects(params, function(err, data) {
    if (err) {// an error occurred
        console.log(err, err.stack);
    } else {// successful response
        console.log('Total photos in folder: ' + data['Contents'].length);
        var counter = 0;
        data['Contents'].forEach(function(item) {
            if (item['Size'] < minimumLimitSize) {
                counter++;
                var imageParams = {Bucket: bucket, Key: item['Key']};
                showImageDimensions(imageParams);
            }
        });
        console.log('Small images number: ' + counter);
    }
});




