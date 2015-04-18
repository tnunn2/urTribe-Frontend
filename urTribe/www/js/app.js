// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('urtribe', ['ionic', 'urtribe.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    templateUrl: "templates/menu.html",
    controller: 'MainController'
  })

  .state('app.dashboard', {
    url: "/dashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard.html",
        controller: 'DashboardController'
      }
    }
  })

  .state('app.contacts', {
    url: "/contacts",
    views: {
      'menuContent': {
        templateUrl: "templates/contacts.html",
        controller: 'ContactsController'
      }
    }
  })

  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html",
        controller: 'SettingsController'
      }
    }
  })

  .state('app.help', {
    url: "/help",
    views: {
      'menuContent': {
        templateUrl: "templates/help.html",
        controller: 'HelpController'
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller: 'ProfileController'
      }
    }
  })

  .state('app.events', {
    url: "/events",
    views: {
      'menuContent': {
        templateUrl: "templates/events.html",
        controller: 'EventsController'
      }
    }
  })
  .state('app.event', {
    url: "/event:eventID",
    views: {
      'menuContent': {
        templateUrl: "templates/event.html",
        controller: 'EventController',
        resolve: {
          event: function($stateParams) {
            return $stateParams.eventID;
          }
        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});
