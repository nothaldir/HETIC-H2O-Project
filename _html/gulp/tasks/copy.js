var gulp      = require('gulp'),
    root      = require('../config').copy,
    wpFiles   = require('../config').wpFiles,
    fonts     = require('../config').fonts,
    componentsTemplates = require('../config').componentsTemplates;

gulp.task('copy:fonts', function(){
  return gulp.src(fonts.src, {dot: true})
    .pipe(gulp.dest(fonts.dest))
});
