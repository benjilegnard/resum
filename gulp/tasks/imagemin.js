var gulp = require('gulp');
var config = require('../config.js');
//var imagemin = require('gulp-imagemin');
//var optipng = require('imagemin-optipng');
//var jpegtran = require('imagemin-jpegtran');

gulp.task('imagemin', function () {
    return gulp.src( config.source + '/img/*' )
        /*
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [optipng(),jpegtran()]
        }))
        */
        .pipe(gulp.dest( config.destination + '/img'));
});