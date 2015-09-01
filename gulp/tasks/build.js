var gulp = require('gulp');

gulp.task('build:dev', ['html:dev', 'lint', 'less:dev']);
gulp.task('build', ['html', 'js-copy', 'less']);