'use strict';

var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');

gulp.task('precompile', function() {
    return gulp.src('./bower_components/webcomponentsjs/webcomponents.min.js')
        .pipe(rename('platform.js'))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('default', []);
