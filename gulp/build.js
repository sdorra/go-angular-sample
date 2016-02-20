module.exports = function(gulp, $, info, paths) {
  'use strict';

  // build go binary
  gulp.task('build-server', function(){
    var spawn = require('child_process').spawnSync;
    spawn('go', ['build', '-o', paths.target + '/' + info.name], { stdio: 'inherit' });
  });

  gulp.task('copy-fonts', function(){
    var fonts = '/bootstrap-sass/assets/fonts/bootstrap/';
    gulp.src(paths.vendor + fonts + '*')
      .pipe(gulp.dest(paths.target + '/public/styles/vendor' + fonts));
  });

  gulp.task('templates', function(){
    return gulp.src(paths.app + '/**/*.html')
      .pipe($.angularTemplatecache({module: 'cockpit', root: 'app'}))
      .pipe(gulp.dest(paths.tmp + '/'));
  });

  // build production ready bundle
  gulp.task('build', ['styles', 'templates', 'build-server', 'copy-fonts'], function(){
    var injection = {
      relative: true,
      ignorePath: '../dist/public'
    };

    var vendorInjection = {
      relative: true,
      starttag: '<!-- bower:{{ext}} -->',
      endtag: ' <!-- endbower -->',
      ignorePath: '../dist/public'
    };

    var injectStyles = gulp.src(
      paths.tmp + '/**/*.css'
    )
    .pipe($.concat(info.name + '.min.css'))
    .pipe($.cssnano())
    .pipe($.rev())
    .pipe(gulp.dest(paths.target + '/public/styles'));

    var injectScripts = gulp.src([
      paths.tmp + '/**/*.js',
      paths.app + '/**/*.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.angularFilesort().on('error', $.util.log))
    .pipe($.iife({useStrict: false}))
    .pipe($.concat(info.name + '.min.js'))
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe($.rev())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.target + '/public/app'));

    var html = gulp.src(paths.src + '/*.html')
      .pipe($.inject(injectScripts, injection))
      .pipe($.inject(injectStyles, injection));

    var wiredepOptions = {
      directory: paths.vendor
    };

    var wiredep = require('wiredep')();

    if (wiredep.js){
      var vendorScripts = gulp.src(wiredep.js)
        .pipe($.sourcemaps.init())
        .pipe($.concat('vendor.min.js'))
        .pipe($.uglify())
        .pipe($.rev())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.target + '/public/app'));

        html = html.pipe($.inject(vendorScripts, vendorInjection));
    }

    if (wiredep.css){
      var vendorStyles = gulp.src(wiredep.css)
        .pipe($.concat('vendor.min.css'))
        .pipe($.cssnano())
        .pipe($.rev())
        .pipe(gulp.dest(paths.target + '/public/styles'));

        html = html.pipe($.inject(vendorStyles, vendorInjection));
    }

    return html.pipe(gulp.dest(paths.target + '/public'));
  });

};
