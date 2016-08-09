/* Magic Mirror Config
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	//port: 8080,

	language: 'en',
	timeFormat: 24,
	units: 'metric',

	modules: [
		{
			module: 'alert',
		},
		{
			module: 'clock',
			position: 'top_left'
		},
		{
			module: 'calendar',
			header: 'Personal Calendar',
			position: 'top_left',
			config: {
				calendars: [
					{
						symbol: 'calendar-check-o ',
						url: 'webcal://p41-calendars.icloud.com/published/2/1jwI4e7SzOevGTCoPy_PQslfUyZwtRgO0hJXUoAPpk_6498plx2Xmb9L2YLIxhEq4l8hg0CjSUfHHg7Oc10GXutT1PSYUhqK3vxxFUOnRvU'
					}
				]
			}
		},
		{
			module: 'helloworld',
			position: 'top_left'
		},
		{
			module: 'jarvis'
		},
		{
			module: 'currentweather',
			position: 'top_right',
			config: {
				location: 'Calgary,CA',
				locationID: '5913490',
				appid: 'b7810d0b3fd8505367e5a20a3897b72c'
			}
		},
		{
			module: 'weatherforecast',
			position: 'top_right',
			header: 'Weather Forecast',
			config: {
				location: 'Calgary,CA',
				locationID: '5913490',
				appid: 'b7810d0b3fd8505367e5a20a3897b72c'
			}
		},
		{
			module: 'newsfeed',
			position: 'bottom_bar',
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
