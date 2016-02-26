'use strict';

angular
  .module('cockpit')
  .config(ConfigureNotifications)
  .run(ApplicationLoaded);

function ConfigureNotifications(toastrConfig){
  angular.extend(toastrConfig, {
    positionClass: 'toast-bottom-right'
  });
}

function ApplicationLoaded(toastr){
  toastr.info('Application loaded', 'Information');
}
