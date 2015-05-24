var urtribeModels = angular.module('urtribe.models', [])
urtribeModels.factory('Event', function () {
      /**
     * Constructor, with class name
     */
    function Event(id, name, datetimeStart, locationName, locationAddress, attendanceStatus) {
      // Public properties, assigned to the instance ('this')
      this.EventID = id;
      this.EventName = name;
      this.DateTimeStart = datetimeStart;
      this.LocationName = locationName;
      this.LocationAddress = locationAddress
      this.AttendanceStatus = attendanceStatus;
    }

      /**
     * Public method, assigned to prototype
     */
    Event.prototype.getEventOverview = function () {
      return this.name + ':' + "here is what this event is about";
    };


      /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Event.build = function (data) {
      return new Event(
        data.EventID,
        data.EventName,
        data.DateTimeStart,
        data.LocationName,
        data.LocationAddress,
        data.AttendanceStatus
      );
    };

    /**
     * Return the constructor function
     */
    return Event;

  });
