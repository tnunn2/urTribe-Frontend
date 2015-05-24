urtribeControllers.controller('DashboardController', function($scope, APIService) {
  $scope.Events;

  //Get User Events happening Today
  APIService.getTodaysEvents(function(events){
    $scope.Events = events;
  });

});
