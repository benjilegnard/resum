
var gulp = require('gulp');
var config = require('../config.js');

gulp.task('watch', function () {
    gulp.watch([config.source+'/**/*.jade','./data/**/*.json'], ['html:dev']);
    gulp.watch([config.source+'/**/*.js'], ['lint'/*, 'browserify'*/,'js-copy']);
    gulp.watch([config.source+'/**/*.less'], ['less:dev']);
});