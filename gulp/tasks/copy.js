var gulp      = require('gulp'),
    root      = require('../config').copy,
    fonts     = require('../config').fonts,
    datas     = require('../config').datas,
    medias    = require('../config').medias,
    componentsTemplates = require('../config').componentsTemplates;

gulp.task('copy:fonts', function(){
  return gulp.src(fonts.src, {dot: true})
    .pipe(gulp.dest(fonts.dest))
});

gulp.task('copy:datas', function(){
	return gulp.src(datas.src, {dot: true})
	  .pipe(gulp.dest(datas.dest))
})

gulp.task('copy:medias', function(){
	return gulp.src(medias.src, {dot: true})
	  .pipe(gulp.dest(medias.dest))
})