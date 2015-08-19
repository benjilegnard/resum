var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var jade = require( 'gulp-jade' );


gulp.task('html', function () {
    gulp.src(config.jade.files)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.destination+'/'))
});

