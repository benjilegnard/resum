var gulp = require('gulp');
var jade = require('gulp-jade');
var config = require('../config.js');

//compile jade template to js so they can be used in the browser.
gulp.task('templates', function() {
    gulp.src(config.source + '/tpl/inc/*.jade')
        .pipe(jade({
            client: true
        }))
        .pipe(gulp.dest(config.source+'/js/resum/templates/'))
});