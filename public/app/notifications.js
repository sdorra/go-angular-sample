'use strict';

angular
  .module('gas')
  .config(ConfigureNotifications)
  .run(RuntimeNotifications);

function ConfigureNotifications(toastrConfig){
  angular.extend(toastrConfig, {
    positionClass: 'toast-bottom-right'
  });
}

function RuntimeNotifications(toastr){
  toastr.info('Application loaded', 'Information');
}
