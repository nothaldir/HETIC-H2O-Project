var gulp      = require('gulp'),
    del       = require('del'),
    cache     = require('gulp-cache'),
    config    = require('../config').clean;

gulp.task('clean', function(){
  return del(config.src);
});

gulp.task('clearCache', function(){
  cache.clearAll();
});