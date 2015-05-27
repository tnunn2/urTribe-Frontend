urtribeControllers.controller('EventsController', function($scope, $state, $window,$ionicPopup, $filter, Event, $ionicModal, APIService) {

    $scope.Events;
    $scope.Contacts;
    $scope.contactsCheckList = {};
    $scope.contactsSelected = [];

    $scope.eventInfo = {};

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
        var collectionDate = $filter('date')(event.eventDate, 'yyyy-MM-dd');
        var collectionTime = $filter('date')(event.eventStartTime, 'HH:mm:ss');
        var timeString = collectionDate+' '+collectionTime;
        var time = new Date(timeString.replace(/-/g, "/")).toISOString();
        var eventData = {
          "ID": "",
          "Name": event.eventName,
          "Description": event.Description,
          "Active": true,
          "Time": time,
          "Location": event.eventLocationName,
          "Street1": event.eventStreetAddress,
          "Street2": "",
          "City": event.eventCity,
          "State": event.eventState,
          "Zip": event.eventZip
        };

        APIService.createEvent(eventData, function(response){
          //if success then add contacts
          if(response.Status == "success") {
            console.log("Event created");
            var eventID = response.Data.EventId;
            APIService.inviteContacts(eventID, $scope.contactsSelected, function(response){
              if(response.Status == "success") {
                //TODO message user of success
                $scope.showPopup();
                console.log("Contacts invited");
              }
              else {
                //TODO handle error
                $scope.showPopup();
                console.log("Contacts invited error");
              }
            });
          }
          else {
            //TODO handle error
            $scope.showPopup();
            console.log("Event created error");
          }
        });


      } else {
        $scope.submitted = true;
      }

    }

    $scope.closeCreateEvent = function($event) {
      $scope.submitted = false;
      $event.preventDefault();

      $scope.eventModal.hide();
      $scope.eventModal.remove();
      $state.go($state.current, {}, {reload: true});
    };

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

    $scope.showContacts = false;

    $scope.addContacts = function () {
      $scope.contactsSelected = [];
      angular.forEach($scope.contactsCheckList, function(value, key) {
        if(value)
        {
          $scope.contactsSelected.push(key);
        }
      });
    };

    //Get User Contacts
    APIService.getContacts(function(contacts){
      $scope.Contacts = contacts;
    });

    $scope.showPopup = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Event Created',
        template: 'Your event was created'
      });
      alertPopup.then(function(res) {

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
