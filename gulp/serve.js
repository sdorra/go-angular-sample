module.exports = function(gulp, $, info, paths) {
  'use strict';

  var browserSync = require('browser-sync');
  var redirector = function(req, res, next){
    if (req.url === '/'){
      res.writeHead(301, {
        "Location": "/ga/"
      });
      res.end();
    } else {
      next();
    }
  };

  function browserSyncInit(baseDir, files) {
    browserSync.instance = browserSync.init(files, {
      startPath: '/',
      proxy: 'http://localhost:7070',
      middleware: [redirector]
    });
  }

  gulp.task('serve', ['styles', 'inject' ], function(){
    var spawn = require('child_process').spawn;
    spawn('gin', ['-p', '7070', '-a', '8080', '-b', './.tmp/gin-bin'], { stdio: 'inherit' });

    browserSyncInit([
        paths.tmp,
        paths.src
      ], [
        paths.tmp + '/**/*.css',
        paths.tmp + '/**/*.js',
        paths.tmp + '/**/*.html'
      ]);

      gulp.watch([
        paths.styles + '/**/*.scss',
        paths.scripts + '/**/*.js',
        paths.src + '/**/*.html'],
        ['inject']
      );
  });

};
