var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

var handleErrors = require('../util/handleErrors');
var config = require('../config').less;

gulp.task('less', function() {
  gulp.src(config.src)
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
    .pipe(gulp.dest(config.dest))
});