'use strict';

angular
  .module('gas')
  .factory('exceptionHandler', ExceptionHandler);

function ExceptionHandler($log, toastr){
  return function(title, message, exception){
    $log.error('title: ' + message, exception);
    toastr.error(message, title);
  };
}
