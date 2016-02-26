'use strict';

angular
  .module('gas')
  .config(ConfigureRoutes);

function ConfigureRoutes($locationProvider, $stateProvider, $urlRouterProvider, navigationProvider){

  navigationProvider.link({
    href: 'home',
    label: 'Home'
  })
  .link({
    href: 'about',
    label: 'About'
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/home")

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm',
      resolve: {
        ping: function($http){
          return $http.get('api/v1/ping').then(function(res){
            return res.data;
          });
        }
      }
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/about/about.html'
    });
}
