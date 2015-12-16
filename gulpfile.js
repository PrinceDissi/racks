'use strict';

var gulp = require('gulp');
var del = require('del');
var bump = require('gulp-bump');
var rename = require('gulp-rename');

var pubfiles = [
    'bower.json',
    'package.json'
];

gulp.task('precompile', function() {
    return gulp.src('./bower_components/webcomponentsjs/webcomponents.min.js')
        .pipe(rename('platform.js'))
        .pipe(gulp.dest('./src/provider/'))
});

gulp.task('bump:patch', function() {
    return gulp.src(pubfiles)
        .pipe(bump())
        .pipe(gulp.dest('./'))
});

gulp.task('bump:minor', function() {
    return gulp.src(pubfiles)
        .pipe(bump({type:'minor'}))
        .pipe(gulp.dest('./'))
});

gulp.task('bump:major', function() {
    return gulp.src(pubfiles)
        .pipe(bump({type:'major'}))
        .pipe(gulp.dest('./'))
});

gulp.task('default', [
    'precompile'
]);
