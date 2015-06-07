urtribeServices.factory('APIService', function ($http, Event, Contact, UserService, $q) {
  var APIService = {};
  //var endpoint = 'http://ec2-52-24-59-76.us-west-2.compute.amazonaws.com:9058';
  var endpoint = '/proxy';
  //Get events overview for events listing

  APIService.getEvents = function(callback) {
    //get events for user
    $http.get(endpoint + '/api/users/'+ UserService.userToken + '/Events').success(function(events) {
        //TODO error handling
        var eventsList = [];
        angular.forEach(events.Data.EventList, function(value) {
          eventsList.push(Event.build(value));
        });


        var prom = []
        angular.forEach(eventsList, function(value){
          prom.push(APIService.getAttendanceStatus(value.ID, function(response){
            if(response.Status == "success") {
              value.setAttendanceStatus(response.Data.Status);
              console.log("Status get success");
            }
            else {
              //TODO handle error
              console.log(response);
              console.log("Get status error");
            }
          }));
        });

        $q.all(prom).then(function(data){
	         callback(eventsList);
         });

    });
  }

  APIService.getTodaysEvents = function(callback) {
    //get events for todayEvents
    $http.get(endpoint + '/api/users/'+ UserService.userToken + '/Events').success(function(events) {
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
    $http.get(endpoint + '/api/users/' + UserService.userToken + '/Contacts').success(function(contacts) {
        //TODO error handling
        console.log("getting contacts")
        console.log(contacts);
        var contactsList = [];
        angular.forEach(contacts.Data.Contacts, function(value) {
          contactsList.push(Contact.build(value));
        });
        callback(contactsList);
    }).
    error(function(response) {
      console.log(response);
      callback(response);
    });
  }

  APIService.createEvent = function(event, callback) {
    console.log("creating event");
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

  APIService.getAttendanceStatus = function(eventID, callback)
  {
    $http.get(endpoint + '/api/events/' + eventID + '/Users/' + UserService.userToken + "/Status/").
      success(function(response) {
        callback(response);
    }).
    error(function(response) {
      callback(response);
    });
  }

  APIService.setAttendanceStatus = function (status, eventID, callback)
  {
    $http.post(endpoint + '/api/Users/' + UserService.userToken + '/events/' + eventID + "/Status/" + status).
      success(function(response) {
        console.log("attendance status set success");
        callback(response);
    }).
    error(function(response) {
      console.log("attendance status set error");
      callback(response);
    });
  }

  return APIService;
});
