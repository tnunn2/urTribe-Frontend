var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models','monospaced.elastic', 'urtribe.services'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicHistory, MessageService, UserService) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.Users = [
        {name: 'Alice Kate', token:"2145873e-1a83-4f12-9f5f-b9ec5fdacba5"},
        {name: 'Jimmy James', token:"521e514f-9fd6-4969-a098-a66465c228c9"}
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
