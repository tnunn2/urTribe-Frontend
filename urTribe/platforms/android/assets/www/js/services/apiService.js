urtribeServices.factory('APIService', function ($http, Event) {
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

  return APIService;
});
