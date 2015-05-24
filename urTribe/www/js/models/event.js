var urtribeModels = angular.module('urtribe.models', [])
urtribeModels.factory('Event', function () {
      /**
     * Constructor, with class name
     */
    function Event(id, name, active, time, location, street1, street2, city, state, zip) {
      // Public properties, assigned to the instance ('this')
      this.ID = id,
      this.Name = name,
      this.Active = active,
      this.Time = time,
      this.Location = location,
      this.Street1 = street1,
      this.Street2 = street2,
      this.City = city,
      this.State = state,
      this.Zip = zip,
      this.AttendanceStatus = "Attending";
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
        data.ID,
        data.Name,
        data.Active,
        data.Time,
        data.Location,
        data.Street1,
        data.Street2,
        data.City,
        data.State,
        data.Zip
      );
    };

    /**
     * Return the constructor function
     */
    return Event;

  });
