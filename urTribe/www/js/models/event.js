var urtribeModels = angular.module('urtribe.models', [])
urtribeModels.factory('Event', function () {
      /**
     * Constructor, with class name
     */
    function Event(name) {
      // Public properties, assigned to the instance ('this')
      this.name = name;
      /*this.datetime = datetime;
      this.description = description;
      this.location = location;
      this.invited = invited;
      this.messages = messages;
      this.attendenceStatus = attendenceStatus;*/
    }

      /**
     * Public method, assigned to prototype
     */
    Event.prototype.getEventOverview = function () {
      return this.name + ':' + "here is what this event is about";
    };

    /**
     * Private property
     */
    var privacy = "only me";

      /**
     * Private function
     */
    function isPrivate() {
      return privacy == "only me";
    }

      /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Event.build = function (data) {
      return new Event(
        data.name
        //Organisation.build(data.organisation) // another model
      );
    };

    /**
     * Return the constructor function
     */
    return Event;

  });
