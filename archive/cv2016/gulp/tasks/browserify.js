var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('browserify', function () {

    return browserify({
        entries: config.source + '/js/resum.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [browserifyShim]
        }).bundle()
        .pipe(source('resum.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', util.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.destination+'/js/'));
});
