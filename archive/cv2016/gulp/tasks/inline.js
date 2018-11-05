var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var inline = require( 'gulp-inline' );
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

//inline some small resources inside the html file (print.css and resum.js)
gulp.task('inline',['html','less','uglify'], function () {
    gulp.src(config.destination + '/*.html')
    	.pipe(inline({
		    base: config.destination + '/',
		    //other tasks already minify resources.
		    //js: uglify(),
		    //css: minifyCSS(),
		    disabledTypes: ['svg', 'img'], // Only inline css & js files 
		    ignore: [
				'https://fonts.googleapis.com/css?family=Roboto:100|Open+Sans',
				'css/resum.css',
				'css/fonts.css'
			]
		}))
		.pipe(htmlmin())
		.pipe(gulp.dest(config.destination));
});
