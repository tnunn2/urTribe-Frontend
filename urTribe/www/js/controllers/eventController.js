urtribeControllers.controller('EventController', function($scope, eventid, Event, APIService) {
  $scope.Event;
  //get event
  var eid = eventid.replace(":", "");
  APIService.getEvent(eid, function(events){
    $scope.Event = events[0];
  });
});
