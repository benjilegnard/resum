var requireDir = require('require-dir');
var gulp = require('gulp');

//each gulp task is defined in its own file, cf https://github.com/greypants/gulp-starter for inspiration
requireDir('./gulp/tasks', { recurse: true });

gulp.task('build:dev', ['html:dev', 'lint', 'less:dev']);
gulp.task('build', ['html', 'js-copy', 'less']);
gulp.task('default', ['connect', 'watch']);