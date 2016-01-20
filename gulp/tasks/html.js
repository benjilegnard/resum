var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var jade = require( 'gulp-jade' );
var data = require('gulp-data');
var jsonData = require('./get-data.js');
var htmlmin = require('gulp-htmlmin');
var connect = require( 'gulp-connect' );

gulp.task('html:dev', function () {
    gulp.src(config.jade.files)
        .pipe(data(jsonData))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.destination+'/'))
        .pipe(connect.reload())
});

gulp.task('html', function () {
    //copy .htaccess first
    gulp.src(config.source+'/.htaccess')
        .pipe(gulp.dest(config.destination+'/'));
    //compile jade, minify and dest
    gulp.src(config.jade.files)
        .pipe(data(jsonData))
        .pipe(jade())
        //html min options, see https://github.com/kangax/html-minifier
        .pipe(
            htmlmin(
                {
                    removeComments:true,
                    collapseWhitespace:true
                }
            )
        )
        .pipe(gulp.dest(config.destination+'/'))
});
