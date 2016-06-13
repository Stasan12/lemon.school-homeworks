var gulp = require('gulp');
var sass = require('gulp-sass');
var prettify = require('gulp-prettify');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

gulp.task('watch', function(){
  global.watch = true;
  watch('./app/scss/**/*.scss', function(){
    runSequence('sass');
  });
  watch('./app/*.html',  function(){
    runSequence('html');
  });
  watch('./app/images/**/*.{png,gif,jpg,svg,ico}', function(){
    runSequence('images');
  });
});
gulp.task('sass', function() {
  return gulp
    .src('./app/scss/index.scss')
    .pipe(plumber())
    .pipe(sass.sync().on('erorr', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});
gulp.task('html', function() {
  return gulp
    .src('./app/*.html')
    .pipe(prettify({
      indent_size: 2
    }))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('images', function() {
  return gulp
    .src('./app/images/**/*.{png,gif,jpg,svg,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
});
gulp.task('serve', function() {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch(['./dist/*.html', './dist/images/**/*']).on('change', browserSync.reload);
});
gulp.task('default', ['html', 'sass', 'images', 'serve', 'watch']);
