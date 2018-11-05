var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var connect = require( 'gulp-connect' );

gulp.task('connect', function () {
    connect.server({
        root: config.destination,
        livereload: true,
        port:8888
    });
});
