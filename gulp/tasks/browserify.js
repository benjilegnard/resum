var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('browserify', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: config.source + '/scripts/main.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [browserifyShim]
    });

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.destination+'/js/'));
});
