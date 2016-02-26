'use strict';

angular
  .module('gas')
  .controller('HomeController', HomeController);

function HomeController(ping){
  var vm = this;

  vm.ping = ping;
}
