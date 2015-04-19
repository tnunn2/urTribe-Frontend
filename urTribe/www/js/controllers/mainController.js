var urtribeControllers = angular.module('urtribe.controllers', ['ui.bootstrap', 'urtribe.models','monospaced.elastic'])

urtribeControllers.controller('MainController', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicHistory) {

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

})
