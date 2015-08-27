var gulp = require( 'gulp' );
var util = require( 'gulp-util' );
var config = require( '../config.js' );
var jade = require( 'gulp-jade' );
var data = require('gulp-data');

function getData(file){
    return {
        'pages':require('../../data/pages.json'),
        'icons':require('../../data/icons.json'),
        'jobs':require('../../data/experience.json'),
        'projects':require('../../data/projects.json'),
        'skills':require('../../data/skills.json'),
        'slides':require('../../data/slides.json')
    }
}

gulp.task('html', function () {
    gulp.src(config.jade.files)
        .pipe(data(getData))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.destination+'/'))
});

