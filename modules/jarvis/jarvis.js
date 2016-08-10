/* Magic Mirror
 * Module: Jarvis
 *
 * By George Dimitrov http://georgendimitrov.com
 * MIT Licensed.
 */

var assistantName = ""
var myName = ""

Module.register("jarvis", {

  // Module defaults
  defaults: {
    assistantVoice: "",
    assistantName: "",
    myName: ""
  },

  // Required Scripts
  getScripts: function() {
		return [this.file("annyang/annyang.min.js"),
            "https://code.responsivevoice.org/responsivevoice.js",
            "https://code.jquery.com/jquery-3.1.0.min.js",
            this.file("spotify/spotify.js")];
	},

  start: function() {

    Log.info("Starting module: " + this.name);

    assistantName = this.config.assistantName.toLowerCase();
    myName = this.config.myName.toLowerCase();

    annyang.debug();
    if (annyang) {

      // Set of commands for Jarvis
      var commands = {
        'hey (*name)': this.hello,

        'hide *moduleName': function(moduleName) {
          moduleName.replace(/ /g,'');
          MM.getModules().withClass(moduleName).enumerate(function(module) {
              module.hide(1000, function() {
                  //Module hidden.
              });
            }
          );
        },

        'show *moduleName': function(moduleName) {
          moduleName.replace(/ /g,'');
          MM.getModules().withClass(moduleName).enumerate(function(module) {
              module.show(1000, function() {
                  //Module shown.
              });
            }
          );
        },

        '(Jarvis) play my jam': function() {
            playSong('Love Yourself','Justin Bieber');
        },

        'stop': function () {
            audio.pause();
        },

        'play track *song': function (song) {
          //recognized('Play track ' + song);
          playSong(song);
        },

        'play *song by *artist': function(song, artistName) {
          playSong(song,artistName);
        },

        'play song *song': function (song) {
          recognized('Play song ' + song);
          playSong(song);
        },

        'play *song': function (song) {
          //recognized('Play ' + song);
          playSong(song);
        },

        ':nomatch': function (message) {
          //recognized(message);
          //communicateAction('Sorry, I don\'t understand this action');
        }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening
      annyang.start();
    }

    // Setting voice default
    responsiveVoice.setDefaultVoice(this.config.assistantVoice);
  },

  notificationReceived: function(notification, payload, sender) {
    if (notification === 'DOM_OBJECTS_CREATED') {
        Log.info("Everything loaded");
        }
    },

  hello: function(name) {
    annyang.pause();

    if(name)
      name = name.trim().toLowerCase();

    if(name && (name == assistantName))
      responsiveVoice.speak("Hello " + myName);
    else {
      responsiveVoice.speak("Hello");
    }

    annyang.resume();
  }
});
