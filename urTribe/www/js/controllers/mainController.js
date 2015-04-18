var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $timeout, $ionicHistory) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $ionicModal.fromTemplateUrl('templates/createEvent.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.eventModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeCreateEvent = function() {
    $scope.eventModal.hide();
  };

  // Open the login modal
  $scope.createEvent = function() {
    $scope.eventModal.show();
  };
})
