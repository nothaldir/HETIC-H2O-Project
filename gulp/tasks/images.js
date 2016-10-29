var gulp      = require('gulp'),
    config    = require('../config').images,
    cache     = require('gulp-cache'),
    plumber   = require('gulp-plumber'),
    notify    = require('gulp-notify'),
    imagemin  = require('gulp-imagemin'),
    pngquant  = require('imagemin-pngquant');

gulp.task('images', function(){
  config.opts.use = [pngquant()];

  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: notify.onError('Images Error : <%= error.message %>')
    }))
    .pipe(cache(imagemin(config.opts)))
    .pipe(gulp.dest(config.dest))
});