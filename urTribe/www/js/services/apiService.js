urtribeServices.factory('APIService', function ($http, Event, Contact, UserService) {
  var APIService = {};
  var endpoint = 'http://ec2-52-24-59-76.us-west-2.compute.amazonaws.com:9058';
  //Get events overview for events listing

  APIService.getEvents = function(callback) {
    //get events for user
    $http.get('/data/events.json').success(function(events) {
        //TODO error handling
        var eventsList = [];
        angular.forEach(events.Data.EventList, function(value) {
          eventsList.push(Event.build(value));
        });
        callback(eventsList);
    });
  }

  APIService.getTodaysEvents = function(callback) {
    //get events for todayEvents
    $http.get('/data/events.json').success(function(events) {
        //TODO error handling
        var eventsList = [];
        angular.forEach(events.Data.EventList, function(value) {
          //check if time of event is today
          var today = new Date();
          var eventTime = new Date(value.Time);
          console.log(eventTime);
          if(today.toDateString() == eventTime.toDateString())
          {
            if(eventTime >= today )
            {
              eventsList.push(Event.build(value));
            }
          }
        });
        callback(eventsList);
    });
  }

  APIService.getContacts = function(callback) {
    //get contacts for user
    $http.get('/data/contacts.json').success(function(contacts) {
        //TODO error handling
        var contactsList = [];
        angular.forEach(contacts.Data.Contacts, function(value) {
          contactsList.push(Contact.build(value));
        });
        callback(contactsList);
    });
  }

  APIService.createEvent = function(event, callback) {
    //get contacts for user
    $http.post(endpoint + '/api/users/' + UserService.userToken + '/Events', event).
      success(function(response) {
        callback(response);
    }).
    error(function(response) {
      callback(response);
    });
  }

  APIService.inviteContacts = function(eventID, contacts, callback) {
    //get contacts for user
    $http.post(endpoint + '/api/users/' + UserService.userToken + '/Events/' + eventID + '/Contacts', contacts).
      success(function(response) {
        callback(response);
    }).
    error(function(response) {
      callback(response);
    });
  }

  return APIService;
});
