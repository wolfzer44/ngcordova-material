(function() {
  'use strict';
  angular.module('starter')
  .controller('MainCtrl', main);

  main.$inject = [];

  function main() {
    var vm = this;
    vm.title = 'Limp';
  }
}());
