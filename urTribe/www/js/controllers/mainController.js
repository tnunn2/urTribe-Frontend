var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models','monospaced.elastic', 'urtribe.services'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicHistory, MessageService) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.Users = [
        {name: 'Jimmy James', token:"1b37a029-7784-4417-9eac-144fe5088439"},
        {name: 'Ashly Thomas', token:"3cc37867-2a0d-43df-b03d-ddc03dc869dc"}
        ];

  $scope.userSelected = $scope.Users[0];

  $scope.setUser = function(user) {
    $scope.userSelected = user;
  }

  $scope.selectedUser = function(user) {
    return $scope.userSelected === user;
  }

  MessageService.initialize();
  //TODO - create API handler singleton here - create class and instantiate


})
