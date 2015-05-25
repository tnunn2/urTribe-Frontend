urtribeServices.factory('APIService', function ($http, Event, Contact, UserService) {
  var APIService = {};

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

  return APIService;
});
