module.exports = function(gulp, $, info, paths) {
  'use strict';

  gulp.task('lint', ['js-lint']);

  gulp.task('js-lint', function(){
    gulp.src(paths.scripts + '/**/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'));
  });

  // TODO scss lint

};
