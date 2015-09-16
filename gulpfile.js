var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

//each gulp task is defined in its own file, cf https://github.com/greypants/gulp-starter for inspiration
requireDir('./gulp/tasks', { recurse: true });

gulp.task('build:dev', ['html:dev', 'lint', 'less:dev']);

gulp.task('build',function(done){
    runSequence('clean',['html', 'js-copy', 'imagemin','less'], done);
} );

gulp.task('default', ['connect', 'watch']);