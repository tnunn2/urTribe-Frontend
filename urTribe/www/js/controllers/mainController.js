var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models','monospaced.elastic', 'urtribe.services'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicHistory, MessageService, UserService) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.Users = [
        {name: 'Alice Kate', token:"601cffd0-1424-4362-8387-3e409b22bae2"},
        {name: 'Ryan Thomas', token:"4a7f2f93-7cc5-4fb7-91ed-cdafc372eab8"}
        ];

  $scope.userSelected = $scope.Users[0];
  UserService.setUser($scope.userSelected.name, $scope.userSelected.token);

  $scope.setUser = function(user) {
    $scope.userSelected = user;
    UserService.setUser($scope.userSelected.name, $scope.userSelected.token);
    MessageService.switchUser("user" + user.token, user.token);
  }

  $scope.selectedUser = function(user) {
    return $scope.userSelected === user;
  }

  MessageService.initialize('user' + $scope.userSelected.token,$scope.userSelected.token);

})
