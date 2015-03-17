urtribeControllers.controller('EventsController', function($scope, Event) {
    $scope.currentEvent = Event.build({name:'MyEvent'});
    $scope.overview = $scope.currentEvent.getEventOverview();

    $scope.eventTypes = [
          {name: 'Upcomming'},
          {name: 'Past'}];

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

  })
