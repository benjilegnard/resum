
var gulp = require('gulp');
var util = require('gulp-util');
var config = require('../config.js');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sourceMaps = require('gulp-sourcemaps');
var connect = require( 'gulp-connect' );


gulp.task('less:dev', function () {
    return gulp.src(config.less.files)
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(config.destination+'/css/'))
        .pipe(connect.reload());
});

gulp.task('less', function () {
    return gulp.src(config.less.files)
        .pipe(less())
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.destination+'/css/'));
});