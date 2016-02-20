module.exports = function(gulp, $, info, paths) {
  'use strict';

  gulp.task('styles', function(done){
    return gulp.src(paths.styles + '/**/*.scss')
      .pipe($.sass())
      .pipe(gulp.dest(paths.tmp))
  });

};
