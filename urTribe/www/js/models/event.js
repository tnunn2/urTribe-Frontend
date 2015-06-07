var urtribeModels = angular.module('urtribe.models', [])
urtribeModels.factory('Event', function () {

    /**
   * Constructor, with class name
   */
    function Event(id, name, active, time, location, street1, street2, city, state, zip, description) {
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
      this.description = description,
      this.AttendanceStatus = null;
    }

      /**
     * Public method, assigned to prototype
     */
    Event.prototype.getEventOverview = function () {
      return this.name + ':' + "here is what this event is about";
    };

    Event.prototype.getMapURL = function () {
      if(this.Street2 !=null)
      {
        return "http://maps.google.com/?q=" + this.Street1 + " " + this.Street2 + "," + this.City  + "," + this.State + "," + this.Zip;
      }
      else {
        return "http://maps.google.com/?q=" + this.Street1  + "," + this.City  + "," + this.State + "," + this.Zip;
      }
    }

    Event.prototype.setAttendanceStatus = function (status) {
      this.AttendanceStatus = status;
    }

    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Event.build = function (data) {
      //create event
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Event(
        data.ID,
        data.Name,
        data.Active,
        new Date(data.Time).toLocaleString('en-US', options),
        data.Location,
        data.Street1,
        data.Street2,
        data.City,
        data.State,
        data.Zip,
        data.Description
      );
      //get people attending
    };

    /**
     * Return the constructor function
     */
    return Event;

  });
