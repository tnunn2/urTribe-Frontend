urtribeServices.factory('APIService', function ($http, Event) {
  var APIService = {};

  //Get events overview for events listing

  APIService.getEvents = function(callback) {
    //get events for user
    $http.get('/data/events.json').success(function(events) {
        // you can do some processing here
        var eventsList = [];
        angular.forEach(events, function(value) {
          eventsList.push(Event.build(value));
        });
        callback(eventsList);
    });
  }

  return APIService;
});
