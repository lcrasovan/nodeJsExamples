// Include gulp
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var exec = require('child_process').exec;

// download task
gulp.task('download', function(callBack) {
    exec('node ftpDownloader.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callBack(err);
    });
});

// upload task
gulp.task('upload', function(callBack) {
    exec('node uploadToGDrive.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callBack(err);
    });
});

// Default Task
gulp.task('default', gulpSequence('download','upload'));