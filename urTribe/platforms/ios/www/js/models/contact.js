urtribeModels.factory('Contact', function () {
      /**
     * Constructor, with class name
     */

    function Contact(id, name) {
      // Public properties, assigned to the instance ('this')
      this.ID = id,
      this.Name = name
    }

      /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Contact.build = function (data) {
      //format Time

      return new Contact(
        data.ID,
        data.Name
      );

      //get attendance Status

      //get people attending
    };

    /**
     * Return the constructor function
     */
    return Contact;

  });
