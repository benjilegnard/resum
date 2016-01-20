
var gulp = require('gulp');
var util = require('gulp-util');
var config = require('../config.js');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var sourceMaps = require('gulp-sourcemaps');
var concat = require( 'gulp-concat' );
var size = require( 'gulp-size' );
var connect = require( 'gulp-connect' );
var autoprefixer = require( 'gulp-autoprefixer' );

var cssCleanOptions = {
    compatibility: 'ie8'
    ,debug:true
    ,aggressiveMerging:false
};

gulp.task('less:dev', function () {
    return gulp.src(config.less.files)
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssnano(cssCleanOptions))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(config.destination+'/css/'))
        .pipe(connect.reload());
});

gulp.task('less', function () {
    return gulp.src(config.less.files)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssnano(cssCleanOptions))
        .pipe(concat('resum.min.css'))
        .pipe(gulp.dest(config.destination+'/css/'));
});