
var gulp = require('gulp');
var util = require('gulp-util');
var config = require('../config.js');
var jsonData = require('./get-data.js');
var PDFDocument = require('pdfkit');


gulp.task('pdf-write', function () {
    var pdfWrite = function(){

        //TODO
    };

    return gulp.src('./src/pdf/*.pdf')
        .pipe(pdfWrite())
        .pipe(gulp.dest(config.destination+'/pdf/'));
});