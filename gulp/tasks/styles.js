var gulp          = require('gulp'),
    config        = require('../config').styles,
    gutil         = require('gulp-util'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    autoprefixer  = require('gulp-autoprefixer'),
    gmq           = require('gulp-combine-mq'),
    csso          = require('gulp-csso'),
    browserSync   = require('browser-sync').create(),
    sourcemaps    = require('gulp-sourcemaps'),
    plumber       = require('gulp-plumber'),
    notify        = require('gulp-notify'),
    options       = require('minimist')(process.argv.slice(2));

gulp.task('styles:vendors', function(){
  return gulp.src(config.vendorSrc)
    .pipe(concat('vendors.css'))
    .pipe(options.production ? gutil.noop() : sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError('SASS Error : <%= error.message %>')
    }))
    .pipe(sass(config.sassOpts))
    .pipe(autoprefixer(config.autoprefixerOpts))
    .pipe(options.production ? gutil.noop() : sourcemaps.write())
    .pipe(options.production ? gmq() : gutil.noop())
    .pipe(options.production ? csso() : gutil.noop())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});

gulp.task('styles:app', function(){
  return gulp.src(config.src)
    .pipe(options.production ? gutil.noop() : sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError('SASS Error : <%= error.message %>')
    }))
    .pipe(sass(config.sassOpts))
    .pipe(autoprefixer(config.autoprefixerOpts))
    .pipe(options.production ? gutil.noop() : sourcemaps.write())
    .pipe(options.production ? gmq() : gutil.noop())
    .pipe(options.production ? csso() : gutil.noop())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
