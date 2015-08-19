
var gulp = require('gulp');
var config = require('../config.js');

gulp.task('watch', function () {
    gulp.watch([config.source+'/**/*.jade'], ['html']);
    gulp.watch([config.source+'/**/*.js'], ['lint'/*, 'browserify'*/]);
    gulp.watch([config.source+'/**/*.less'], ['less']);
});