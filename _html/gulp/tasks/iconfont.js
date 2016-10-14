var gulp          = require('gulp'),
    config        = require('../config').iconfont,
    plumber       = require('gulp-plumber'),
    notify        = require('gulp-notify'),
    iconfont      = require('gulp-iconfont'),
    iconfontCSS   = require('gulp-iconfont-css')
    runSequence   = require('run-sequence');

gulp.task('iconfont', function(){
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: notify.onError('IconFont Error: <%= error.message %>')
    }))
    .pipe(iconfontCSS(config.opts))
    .pipe(iconfont({
      fontName: config.opts.fontName,
      normalize: true
    }))
    .pipe(gulp.dest(config.dest));
});

gulp.task('iconfontCopy', function(){
  return gulp.src(config.fontSrc, {dot: true})
    .pipe(gulp.dest(config.fontDest))
});

gulp.task('iconfontWatch', function(){
  runSequence('iconfont', 'styles:app', 'iconfontCopy', 'iconfontAlone');
});
