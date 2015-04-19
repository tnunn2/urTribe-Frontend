var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models','monospaced.elastic', 'urtribe.services'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicHistory, MessageService) {

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  //TODO - create message handler singleton here - create class and instantiate

  //TODO - create API handler singleton here - create class and instantiate

  //Message notification test
  $scope.showPopup = function() {
    $scope.data = {}
  // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/eventInviteNotificationPopup.html',
      title: "You're Invited!",
      scope: $scope,
      buttons: [
        { text: 'Close' }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };

  MessageService.initialize();

})
