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
        setStatus(eventsList,callback);
    });
  }

  function setStatus(eventsList, callback){
    var reducedEventsList = [];
    var prom = []
    angular.forEach(eventsList, function(value){
      prom.push(APIService.getAttendanceStatus(value));
    });

    $q.all(prom).then(function(data){
       angular.forEach(eventsList, function(value){
         if(value.AttendanceStatus != "Declined")
         {
           reducedEventsList.push(value);
         }
       });
       
       callback(reducedEventsList);
     });
  };

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
        setStatus(eventsList,callback);
    });
  }

  APIService.getContacts = function(callback) {
    //get contacts for user
    $http.get(endpoint + '/api/users/' + UserService.userToken + '/Contacts').success(function(contacts) {
        //TODO error handling
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

  APIService.getAttendanceStatus = function(event)
  {
    var defer = $q.defer();
    $http.get(endpoint + '/api/events/' + event.ID + '/Users/' + UserService.userToken + "/Status/").
      success(function(response) {
        if(response.Status == "success") {
          event.setAttendanceStatus(response.Data.Status);
          defer.resolve(response);
        }
        else {
          //TODO handle error
          console.log(response);
          console.log("Get status error");
          defer.reject(response);
        }

    }).
    error(function(response) {
        defer.reject(response);
    });
    return defer.promise;
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
