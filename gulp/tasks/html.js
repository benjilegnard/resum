var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var jade = require( 'gulp-jade' );

function getData(){
    return {
        'pages':require('../../data/pages.json'),
        'icons':require('../../data/icons.json'),
        'jobs':require('../../data/jobs.json'),
        'projects':require('../../data/projects.json'),
        'skills':require('../../data/skills.json'),
    }
}

gulp.task('html', function () {
    gulp.src(config.jade.files)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.destination+'/'))
});

