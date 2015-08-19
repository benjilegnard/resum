
var gulp = require('gulp');
var util = require('gulp-util');
var config = require('../config.js');
var less = require('gulp-less');


gulp.task('less', function () {
    return gulp.src(config.less.files)
        .pipe(less())
        .pipe(gulp.dest(config.destination+'/css/'));
});