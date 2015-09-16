var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config' );
var ftp = require( 'vinyl-ftp' );

gulp.task( 'deploy',['build'], function() {

    var connection = ftp.create( {
        host:     config.ftp.ftphost,
        user:     config.ftp.username,
        password: config.ftp.password,
        parallel: 10,
        log:      util.log
    } );

    var globs = [
        '/build/**'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { cwd: '../../', buffer: false } )
        .pipe( connection.newer( '/www/resum' ) ) // only upload newer files
        .pipe( connection.dest( '/www/resum' ) );

} );






