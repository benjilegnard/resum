
var gulp = require('gulp');
var util = require('gulp-util');
var config = require('../config.js');
var zip = require('gulp-zip');


gulp.task('zip',['build'], function () {
    return gulp.src(config.destination+'/**/*')
        .pipe(zip('resum.zip'))
        .pipe(gulp.dest('./'));
});