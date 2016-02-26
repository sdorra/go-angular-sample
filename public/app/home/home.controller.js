'use strict';

angular
  .module('cockpit')
  .controller('HomeController', HomeController);

function HomeController(ping){
  var vm = this;

  vm.ping = ping;
}
