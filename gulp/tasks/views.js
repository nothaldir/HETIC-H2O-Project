var gulp        = require('gulp'),
   config      = require('../config').views,
   browserSync   = require('browser-sync').create(),
   processhtml = require('gulp-processhtml');

gulp.task('views', function () {
   return gulp.src(config.src)
              .pipe(processhtml(config.opts))
              .pipe(gulp.dest(config.dest))
              .pipe(browserSync.stream());
});
