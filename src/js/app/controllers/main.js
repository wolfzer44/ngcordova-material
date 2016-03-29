(function() {
  'use strict';
  angular.module('starter')
  .controller('MainCtrl', main);

  main.$inject = ['$mdDialog'];

  function main($mdDialog) {
    var vm = this;
    vm.open = function (ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('md-button')))
        .clickOutsideToClose(true)
        .title('Start')
        .textContent('add same tings here')
        .ariaLabel('alert demp')
        .ok('lets go it')
        .targetEvent(ev)
      );
    };
  }
}());
