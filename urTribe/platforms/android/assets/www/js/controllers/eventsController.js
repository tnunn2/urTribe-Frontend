urtribeControllers.controller('EventsController', function($scope, Event, $ionicModal, APIService) {

    $scope.Events;

    $scope.submitted = false;

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

    //Get User Events
    APIService.getEvents(function(events){
      $scope.Events = events;
    });


    $scope.submitEvent = function(event,isCreateEventFormValid){

      if (isCreateEventFormValid){

      } else {
        $scope.submitted = true;
      }

    }

    // Triggered in the login modal to close it
    $scope.closeCreateEvent = function($event) {
      $scope.submitted = false;
      $event.preventDefault();

      $scope.eventModal.hide();
      $scope.eventModel.remove();
    };

    // Open the login modal
    $scope.createEvent = function() {
      $ionicModal.fromTemplateUrl('templates/createEvent.html', {
        scope: $scope,
        focusFirstInput: true,
        backdropClickToClose: false
      }).then(function(modal) {
        $scope.eventModal = modal;
        $scope.eventModal.show();
      });
    };
})

urtribeControllers.directive('ngFocus', [function() {
  var FOCUS_CLASS = "ng-focused";
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$focused = false;
      element.bind('focus', function(evt) {
        element.addClass(FOCUS_CLASS);
        scope.$apply(function() {ctrl.$focused = true; ctrl.$blur = false;});
      }).bind('blur', function(evt) {
        element.removeClass(FOCUS_CLASS);
        scope.$apply(function() {ctrl.$focused = false; ctrl.$blur = true;});
      });
    }
  }
}]);
