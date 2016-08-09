/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
var worldText = "Hello"

Module.register("helloworld",{

	// Default module config.
	defaults: {
		text: "Hello World!",
		updateInterval: 30000,
		fadeSpeed: 4000
	},

	start: function() {
		// Schedule update timer.
		var self = this;
		setInterval(function() {
			if(worldText == "Hello") {
				worldText = "World"
			}
			else {
				worldText = "Hello"
			}
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = worldText;
		return wrapper;
	}
});
