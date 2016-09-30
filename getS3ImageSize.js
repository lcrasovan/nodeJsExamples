var AWS = require('aws-sdk'),
    gm = require('gm').subClass({imageMagick: true}),
    fs = require('fs');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json')),
    s3 = new AWS.S3(config.aws.origin),
    bucket = config.aws.bucket,
    minimumLimitSize = config.minimumLimitSize,
    maxKeys = config.maxKeys,
    minWidth = config.minWidth,
    pathToPhotosWithPrefix = config.pathToPhotosWithPrefix,
    urlAmazonS3 = config.urlAmazonS3,
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
                console.log('Possible small image:' + params['Key']);
                if (size.width < minWidth) {
                    console.log('Small image:' +
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

function getImageDimensionsFromUrl(params) {
    var url = require('url');
    var http = require('http');
    var sizeOf = require('image-size');

    var imgUrl = urlAmazonS3 + params['Key'];
    var options = url.parse(imgUrl);

    http.get(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
            chunks.push(chunk);
        }).on('end', function() {
            var buffer = Buffer.concat(chunks);
            if (sizeOf(buffer).width < minWidth) {
                console.log('Small image:' +
                    params['Key'] + ' | dimensions: ' +
                    sizeOf(buffer).width +
                    'x' +
                    sizeOf(buffer).height
                );
            }
        });
    });
};


s3.listObjects(params, function(err, data) {
    if (err) {// an error occurred
        console.log(err, err.stack);
    } else {// successful response
        console.log('Total photos in folder: ' + data['Contents'].length);
        var counter = 0;
        data['Contents'].forEach(function(item) {
            console.log(item['Size']);
            if (item['Size'] < minimumLimitSize) {
                counter++;
                var imageParams = {Bucket: bucket, Key: item['Key']};
                if(item['Key'].indexOf('%') !== -1) {
                    getImageDimensionsFromUrl(imageParams);
                } else {
                    showImageDimensions(imageParams);
                }
            }
        });
        console.log('Small images number: ' + counter);
    }
});




