
var gulp = require('gulp');
var util = require('gulp-util');
var config = require('../config.js');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
    return gulp.src(config.source + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('js-copy', function () {
    return gulp.src(config.source + '/js/**/*.js')
        .pipe(gulp.dest(config.destination + '/js'));
});
