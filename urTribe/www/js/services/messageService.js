var urtribeServices = angular.module('urtribe.services', [])
urtribeServices.factory('MessageService', function ($ionicPopup, $rootScope) {
  var storageRef;
  var applicationKey = "kSVcgZ";
  var authenticationToken = "PhoneTestUserToken";
  var userTableName = "PhoneTestUser";
  var eventTableSubscriptions = [];

  var MessageService = {};

  MessageService.initialize = function() {
    //connect to realtime framework
    connectRealTime(function(response){
      console.log(response);
      if(response.error)
      {
        console.error(response.error);
        return response;
      }
      else
      {
        //listen to subscribed tables
        listenUserTable(function(response){

        });
      }
    });
  }

  //handle notifications

  function connectRealTime(callback) {
    //authenticate User with Realtime Framework
    // Create a storage reference
    storageRef = Realtime.Storage.create({
	     applicationKey: applicationKey,
	     authenticationToken: authenticationToken
    });
    console.log(authenticationToken);
    authUser(function(response){
      if(!response)
      {
        callback(JSON.stringify({"error": "User not authenticated with realtime framework"}));
      }

      console.log(storageRef);

      //Create a reference to the users table
      var tableRef = storageRef.table(userTableName);
      console.log(tableRef);
      callback(JSON.stringify({"success": "User authenticated"}));
    });
  }

  function authUser(callback) {
    storageRef.isAuthenticated(authenticationToken,
    	function success(data) {
        console.log("Success auth");
    		callback(true);
    	},
    	function error(data) {
    		console.error(data);
        callback(false);
    	}
    );
  }

  function listenUserTable(callback)
  {
    var tableRef = storageRef.table("PhoneTestUser", function (error){
      callback(JSON.stringify({"error": error}));
    });

    tableRef.on("update", function(itemSnapshot) {
      if(itemSnapshot!=null)
      {
        console.log(itemSnapshot.val());
        var $notificationScope = $rootScope.$new(true);
        $notificationScope.item = itemSnapshot.val();
        var myPopup = $ionicPopup.show({
          templateUrl: 'templates/eventInviteNotificationPopup.html',
          title: "You're Invited!",
          scope: $notificationScope,
          buttons: [
            { text: 'Close' }
          ]
        });
        myPopup.then(function(res) {
          console.log('Tapped!', res);
        });
      }
    });
  }

  function startEventListeners(tables, callback)
  {
    var promises = [];

    for (i = 0; i < tables.length; i++) {
        //var promise = function createListener(tables[i]);
        promises.push(promise);
    }

    $q.all(promises);

  }

  function createEventListener(table)
  {
    var deferred = $q.defer();

    //create table ref
    var tableRef = storageRef.table("myTable", function (error){
      deferred.reject(JSON.stringify({"error": error}));
    });

    tableRef.on("put", function handler(itemSnapshot) {
      deferred.resolve(itemSnapshot.val());
    });


    return deferred.promise;
  }

  return MessageService;
});
