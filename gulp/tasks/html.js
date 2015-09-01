var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var jade = require( 'gulp-jade' );
var data = require('gulp-data');
var jsonData = require('./get-data.js');
var minifyHTML = require('gulp-minify-html');

gulp.task('html:dev', function () {
    gulp.src(config.jade.files)
        .pipe(data(jsonData))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.destination+'/'))
});

gulp.task('html', function () {
    gulp.src(config.jade.files)
        .pipe(data(jsonData))
        .pipe(jade())
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.destination+'/'))
});
