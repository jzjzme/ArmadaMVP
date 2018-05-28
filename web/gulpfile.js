var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var webserver = require('gulp-webserver');

gulp.task('default', [], function() {
  gulp.src('.').pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: true
  }));
});
