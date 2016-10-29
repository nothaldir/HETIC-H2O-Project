// Require plugins
var gulp        = require('gulp'),
  requireDir    = require('require-dir'),
  runSequence   = require('run-sequence');

// Load tasks
requireDir('./gulp/tasks');

// Default task
gulp.task('default', function(){
  runSequence('clean', 'iconfont', 'server');
});

// Build
gulp.task('build', function(){
  runSequence('clean',
              'iconfont',
              'copy:root',
              'copy:fonts',
              'styles:vendors',
              'styles:app',
              'scripts:vendors',
              'scripts:app',
              'images');
});
