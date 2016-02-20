'use strict';

function HomeController(ping){
  var vm = this;

  vm.ping = ping;
}

angular.module('cockpit').controller('HomeController', HomeController);
