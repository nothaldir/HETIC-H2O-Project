var gulp      = require('gulp'),
    root      = require('../config').copy,
    fonts     = require('../config').fonts,
    datas     = require('../config').datas,
    componentsTemplates = require('../config').componentsTemplates;

gulp.task('copy:fonts', function(){
  return gulp.src(fonts.src, {dot: true})
    .pipe(gulp.dest(fonts.dest))
});

gulp.task('copy:datas', function(){
	return gulp.src(datas.src, {dot: true})
	  .pipe(gulp.dest(datas.dest))
})