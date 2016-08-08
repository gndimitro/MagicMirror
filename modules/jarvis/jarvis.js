/* Magic Mirror
 * Module: Jarvis
 *
 * By George Dimitrov http://georgendimitrov.com
 * MIT Licensed.
 */

var assistantName = "jarvis"

Module.register("jarvis", {

  // Module defaults
  defaults: {
    assistantVoice: "UK English Male"
  },

  // Required Scripts
  getScripts: function() {
		return ["annyang.js",
            "http://code.responsivevoice.org/responsivevoice.js"];
	},

  start: function() {
      Log.info("Starting module: " + this.name);
      annyang.debug();
        if (annyang) {
          // Let's define a command.
          var commands = {
            'hello (*name)': this.hello
          };

          // Add our commands to annyang
          annyang.addCommands(commands);

          // Start listening
          annyang.start();
    }

    this.test = "yolo";

    Log.info(this.config.assistantVoice);
    Log.info(this.config.assistantName);

    // Setting voice default
    responsiveVoice.setDefaultVoice(this.config.assistantVoice);
  },

  hello: function(name) {

    if(name)
      name = name.trim().toLowerCase();

    if(name && (name == assistantName))
      responsiveVoice.speak("Hello George");
    else {
      responsiveVoice.speak("Hello");
    }
  }
});
