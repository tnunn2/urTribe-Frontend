urtribeServices.factory('UserService', function ($http, Event) {
  var UserService = {};

  //Get events overview for events listing
  var userName;
  var userToken;

  UserService.setUser = function(userName, userToken) {
    this.userName = userName;
    this.userToken = userToken;
  };


  return UserService;
});
