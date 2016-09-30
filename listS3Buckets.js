var AWS = require('aws-sdk'),
    fs = require('fs');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json')),
    s3 = new AWS.S3(config.aws.origin);

s3.listBuckets(function(err, data) {
    if (err) { console.log("Error:", err); }
    else {
        for (var index in data.Buckets) {
            var bucket = data.Buckets[index];
            console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
        }
    }
});

