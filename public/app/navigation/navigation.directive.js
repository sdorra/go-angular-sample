'use strict';

angular
  .module('cockpit')
  .directive('gasNavigation', NavigationDirective);

function NavigationDirective($location, navigation){

  function NavigationController(){
    var vm = this;

    vm.isCollapsed = true;
    vm.links = navigation.links;

    vm.toggleCollapsed = function(){
      vm.isCollapsed = !vm.isCollapsed;
    };

    vm.navClass = function(link) {
      var page = link.href;
      var currentRoute = $location.path();
      return page === currentRoute || new RegExp(page).test(currentRoute) ? 'active' : '';
    };
  };

  return {
    restrict: 'E',
    controller: NavigationController,
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/navigation/navigation.html',
    scope: {
      title: '@'
    }
  };
}
