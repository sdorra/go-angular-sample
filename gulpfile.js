'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var info = require('./package.json');
var paths = {
  tmp: '.tmp',
  src: 'public',
  app: 'public/app',
  styles: 'public/styles',
  vendor: 'public/vendor',
  target: 'dist'
}

var tasks = require('fs').readdirSync('./gulp');
tasks.forEach(function(file){
  require('./gulp/' + file)(gulp, $, info, paths);
});
