// Include gulp
var gulp = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    exec = require('child_process').exec,
    minimist = require('minimist');

var knownOptions = {
    string: 'daysBefore',
    default: { daysBefore: 1 }
};

var options = minimist(process.argv.slice(2), knownOptions);

// download task
gulp.task('download', function(callBack) {
    exec('node ftpDownloader.js --daysBefore ' + options.daysBefore, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callBack(err);
    });
});

// upload task
gulp.task('upload', function(callBack) {

    console.log('In upload task: ' + options.daysBefore);
    
    exec('node uploadToGDrive.js --daysBefore ' + options.daysBefore, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callBack(err);
    });
});

// upload task
gulp.task('findSmallImages', function(callBack) {
    exec('node getS3ImageSize.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callBack(err);
    });
});




// Default Task
gulp.task('default', gulpSequence('download','upload'));