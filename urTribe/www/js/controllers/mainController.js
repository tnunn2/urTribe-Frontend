var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models','monospaced.elastic', 'urtribe.services'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicHistory, MessageService, UserService) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.Users = [
        {name: 'Jimmy James', token:"5c915964-7362-45a2-9ed5-870078ff8b6f"},
        {name: 'Ashly Thomas', token:"b5fc7680-25ae-4d62-9202-753b40e8dbbc"}
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

  MessageService.initialize("PhoneTestUser","PhoneTestUserToken");

})
