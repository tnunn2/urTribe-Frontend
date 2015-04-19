urtribeControllers.controller('EventsController', function($scope, Event, $ionicModal) {

    $scope.currentEvent = Event.build({name:'MyEvent'});
    $scope.overview = $scope.currentEvent.getEventOverview();

    $scope.eventTypes = [
          {name: 'Upcomming'},
          {name: 'Invites'},
          {name: 'Hosting'},
          {name: 'Past'}
          ];

    $scope.selectedEventType = $scope.eventTypes[0];

    $scope.setEventType = function(eventType) {
          $scope.selectedEventType = eventType;
    }

    $scope.eventTypeSelected = function(eventType) {
      return $scope.selectedEventType === eventType;
    }

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      console.log("toggled");
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
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
