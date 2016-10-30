var gulp          = require('gulp'),
    config        = require('../config'),
    browserSync   = require('browser-sync'),
    php           = require('gulp-connect-php');

gulp.task('php', function(){
  php.server(config.php);
});

gulp.task('server', ['copy:fonts', 'copy:datas', 'views', 'styles:vendors', 'styles:app', 'scripts:vendors', 'scripts:app', 'images'], function(){
  browserSync(config.browserSync);
  var reload = browserSync.reload;

  gulp.watch(config.styles.watchSrc, ['styles:app', reload]);
  gulp.watch(config.styles.watchSrc, ['styles:vendors', reload]);
  gulp.watch(config.views.watchSrc, ['views', reload]);
  gulp.watch(config.images.src, ['images', reload]);
  gulp.watch(config.scripts.src, ['scripts:app', reload]);
  gulp.watch(config.iconfont.src, ['iconfontWatch', reload]);
});
