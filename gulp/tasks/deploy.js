var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

gulp.task( 'deploy', function() {

    var connection = ftp.create( {
        host:     process.env.BLGNET_HOST,
        user:     process.env.BLGNET_USER,
        password: process.env.BLGNET_PASS,
        parallel: 10,
        log:      util.log
    } );

    var globs = [
        'src/**',
        'css/**',
        'js/**',
        'fonts/**',
        'index.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( connection.newer( '/public_html' ) ) // only upload newer files
        .pipe( connection.dest( '/public_html' ) );

} );






