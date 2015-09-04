
var gulp = require('gulp');
var util = require('gulp-util');
var config = require('../config.js');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var connect = require( 'gulp-connect' );

gulp.task('lint', function () {
    return gulp.src(config.source + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('js-copy', function () {
    return gulp.src(config.source + '/js/**/*.js')
    	.pipe(sourcemaps.init())
    	.pipe(uglify())
    	.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.destination + '/js'))
});
