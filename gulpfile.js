var requireDir = require('require-dir');

//each gulp task is defined in its own file, cf https://github.com/greypants/gulp-starter for inspiration
requireDir('./gulp/tasks', { recurse: true });
