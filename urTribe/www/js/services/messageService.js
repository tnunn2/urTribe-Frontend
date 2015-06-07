var urtribeServices = angular.module('urtribe.services', [])
urtribeServices.factory('MessageService', function ($ionicPopup, $rootScope) {
  var storageRef;
  var applicationKey = "rUaRaB";
  var authenticationToken = "PhoneTestUserToken";
  var userTableName = "PhoneTestUser";
  var eventTableSubscriptions = [];

  var MessageService = {};

  MessageService.initialize = function(userTable, token) {
    //connect to realtime framework
    authenticationToken = token;
    userTableName = userTable;
    console.log(userTable);
    MessageService.connectRealTime(function(response){
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

  MessageService.switchUser = function(userTable, token) {
    var tableRef = storageRef.table(userTableName, function (error){
      callback(JSON.stringify({"error": error}));
    });

    tableRef.off("update", function(itemSnapshot) {
    });

    MessageService.initialize(userTable,token);
  }

  //handle notifications

   MessageService.connectRealTime = function(callback) {
    //authenticate User with Realtime Framework
    // Create a storage reference
    storageRef = Realtime.Storage.create({
	     applicationKey: applicationKey,
	     authenticationToken: authenticationToken
    });
    authUser(function(response){
      if(!response)
      {
        callback(JSON.stringify({"error": "User not authenticated with realtime framework"}));
      }
      //Create a reference to the users table
      var tableRef = storageRef.table(userTableName);
      console.log("auth success");
      callback(JSON.stringify({"success": "User authenticated"}));
    });
  }

  function authUser(callback) {
    storageRef.isAuthenticated(authenticationToken,
    	function success(data) {
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
    console.log("listen to user table");
    var tableRef = storageRef.table(userTableName, function (error){
      console.log(error);
      callback(JSON.stringify({"error": error}));
    });

    tableRef.on("update", function(itemSnapshot) {
      console.log("item placed");
      if(itemSnapshot!=null)
      {
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
