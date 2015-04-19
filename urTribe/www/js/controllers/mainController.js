var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models','monospaced.elastic', 'urtribe.services'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicHistory, MessageService) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  MessageService.initialize();

  //TODO - create API handler singleton here - create class and instantiate



})
