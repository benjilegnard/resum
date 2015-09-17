var gulp = require('gulp'),
    util = require('gulp-util'),
    config = require('../config.js'),
    cssfont64 = require('gulp-cssfont64'),
    concat = require('gulp-concat');
var size = require('gulp-size');
var ttf2woff = require('gulp-ttf2woff');


gulp.task('fonts', function () {
    gulp.src([config.source + '/font/Roboto.ttf',config.source + '/font/Open Sans.ttf'])
        .pipe(size({title:'ttf',showFiles:true}))
        .pipe(ttf2woff())
        .pipe(gulp.dest(config.destination +'/font'))
        .pipe(size({title:'woff',showFiles:true}))
        .pipe(cssfont64())
        .pipe(concat('fonts.css'))
        .pipe(gulp.dest(config.destination +'/css'));
});


