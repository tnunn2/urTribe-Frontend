var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models','monospaced.elastic', 'urtribe.services'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicHistory, MessageService, UserService) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.Users = [
        {name: 'Alice Kate', token:"f58db150-15d8-4084-9e89-5a3e2ca7b9e7"},
        {name: 'Jimmy James', token:"d2f02c83-2670-42f9-bfa7-3bb506e9bcac"}
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
