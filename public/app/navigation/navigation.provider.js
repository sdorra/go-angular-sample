'use strict';

angular
  .module('gas')
  .provider('navigation', NavigationProvider);

function NavigationProvider(){

  var links = [];

  this.link = function(link){
    links.push(link);
    return this;
  };

  this.$get = function(){
    return {
      links: links
    };
  };
}
