module.exports = function(gulp, $, info, paths) {
  'use strict';

  gulp.task('inject', ['styles'], function(){
    var injectStyles = gulp.src([
        paths.tmp + '/**/*.css'
      ], {read: false}
    );

    var injectScripts = gulp.src(paths.app + '/**/*.js')
      .pipe($.angularFilesort().on('error', $.util.log));

    var wiredep = require('wiredep').stream;

    return gulp.src(paths.src + '/*.html')
      .pipe($.inject(injectStyles, {ignorePath: '../.tmp', relative: true}))
      .pipe($.inject(injectScripts, {ignorePath: '/public', relative: true}))
      .pipe(wiredep())
      // write the injections to the .tmp/index.html file
      .pipe(gulp.dest(paths.tmp));
  });

};
