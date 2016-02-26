module.exports = function(gulp, $, info, paths) {
  'use strict';

  gulp.task('styles', function(done){
    var prefixerCfg = {
      browsers: ["> 0%"],
      cascade: false
    };

    return gulp.src(paths.styles + '/**/*.scss')
      .pipe($.sass())
      .pipe($.autoprefixer(prefixerCfg))
      .pipe(gulp.dest(paths.tmp))
  });

};
