'use strict';

angular
  .module('gas')
  .config(ConfigureExceptionHandler)
  .run(HandleRoutingExceptions);

function ConfigureExceptionHandler($provide){
  $provide.decorator('$exceptionHandler', CustomExceptionHandler);
}

function HandleRoutingExceptions($rootScope, exceptionHandler){
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    exceptionHandler('Routing Error', error.message, error);
  });
}

// use injector to avoid circular dependency issues
function CustomExceptionHandler($delegate, $injector){
  return function(exception, cause){
    $delegate(exception, cause);
    $injector.get('exceptionHandler')('Exception', exception.message, {
      exception: exception,
      cause: cause
    });
  };
}
