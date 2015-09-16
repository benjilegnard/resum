var gulp = require('gulp'),
    util = require('gulp-util'),
    config = require('../config.js'),
    cssfont64 = require('gulp-cssfont64');

gulp.task('default', function () {
    gulp.src(config.source + 'fonts/*.ttf')
        .pipe(cssfont64())
        .pipe(gulp.dest(config.destination));
});


