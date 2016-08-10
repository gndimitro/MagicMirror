/* Magic Mirror
 * Module: Jarvis
 *
 * By George Dimitrov http://georgendimitrov.com
 * MIT Licensed.
 */

var assistantName = ""
var myName = ""

function waitForJarvis() {
  //Log.info(responsiveVoice.isPlaying());
  if(responsiveVoice.isPlaying())
    window.setTimeout(waitForJarvis,2000);
  else
    annyang.resume();
}

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
    var _this = this;
    annyang.debug();

    if (annyang) {

      // Set of commands for Jarvis
      var commands = {
        'hey (*name)': this.hello,

        ':assistantName hide (the) *moduleName': this.hideModule,

        'hide (the) *moduleName': function(moduleName) {
          _this.hideModule(null, moduleName);
        },

        ':assistantName show (the) *moduleName': this.showModule,

        'show (the) *moduleName': function(moduleName) {
          _this.showModule(null, moduleName);
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
          playSong(song);
        },

        'play *song': function (song) {
          playSong(song);
        },

        '*nomatch': function () {
          annyang.pause();
          window.setTimeout(waitForJarvis,6100);
          responsiveVoice.speak("I did not understand the command, please repeat...");
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

  //Just an example of getting a notification
  /*notificationReceived: function(notification, payload, sender) {
    if (notification === 'DOM_OBJECTS_CREATED') {
        Log.info("Everything loaded");
        }
    },*/

  hello: function(name) {
    annyang.pause();

    window.setTimeout(waitForJarvis,1000);

    if(name)
      name = name.trim().toLowerCase();

    if(name && (name == assistantName))
      responsiveVoice.speak("Hello " + myName);
    else {
      responsiveVoice.speak("Hello");
    }
  },

  hideModule: function(name, moduleName) {
    if(name && (name.toLowerCase() == assistantName))
      responsiveVoice.speak("Right away sir");

    moduleName = moduleName.replace(/ /g,"");
    MM.getModules().withClass(moduleName).enumerate(function(module) {
        module.hide(1000, function() {
            //Module hidden.
        });
      }
    );
  },

  showModule: function(name, moduleName) {
    if(name && (name.toLowerCase() == assistantName))
      responsiveVoice.speak("Right away sir");

    moduleName = moduleName.replace(/ /g,"");
    MM.getModules().withClass(moduleName).enumerate(function(module) {
        module.show(1000, function() {
            //Module shown.
        });
      }
    );
  }
});
