var gulp = require('gulp');
var config = require('../config').less;

gulp.task('watch', function() {
  gulp.watch(config.watch, ['less']);
})