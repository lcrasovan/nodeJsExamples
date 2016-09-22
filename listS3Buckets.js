var size = require('s3-image-size');
var AWS = require('aws-sdk');

// 1. list your buckets
var s3 = new AWS.S3('PUT_HERE_YOUR_S3_ORIGIN');


s3.listBuckets(function(err, data) {
    if (err) { console.log("Error:", err); }
    else {
        for (var index in data.Buckets) {
            var bucket = data.Buckets[index];
            console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
        }
    }
});

