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
            "http://code.responsivevoice.org/responsivevoice.js",
            "https://code.jquery.com/jquery-3.1.0.min.js",
            this.file("spotify/spotify.js")];
	},

  start: function() {
      Log.info("Starting module: " + this.name);

      annyang.debug();
        if (annyang) {
          // Let's define a command.
          var commands = {
            'hello (*name)': this.hello,

            'hey (*name)': this.hello,

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

  hello: function(name) {
    annyang.pause();

    if(name)
      name = name.trim().toLowerCase();

    if(name && (name == assistantName))
      responsiveVoice.speak("Hello George, how are you my friend?");
    else {
      responsiveVoice.speak("Hello");
    }
    Log.info(this.config.name)
    annyang.resume();
  }
});
