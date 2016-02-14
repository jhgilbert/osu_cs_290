var OPEN_WEATHER_MAP_KEY = '883dd2f4f91dc1a2b2580c100ea0389a';

document.addEventListener('DOMContentLoaded', initPostFormListener);
document.addEventListener('DOMContentLoaded', initWeatherFormListener);

function initWeatherFormListener() {
	document.getElementById('weather-request').addEventListener('submit', function() {
		event.preventDefault();
		// do your thing
	})
}

function initPostFormListener() {
	document.getElementById('httpbin-form').addEventListener('submit', function(event) {
		event.preventDefault();

		// prepare HTTP request
		var req = new XMLHttpRequest();
		req.open("POST", "http://httpbin.org/post", true);
		req.setRequestHeader('Content-Type', 'application/json');

		// prepare payload
		var name = document.getElementById('postform-name').value;
		var color = document.getElementById('postform-color').value;
		var data = {name: name, favorite_color: color};

		// print out results once the request has gone through
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				var response = JSON.parse(req.responseText);
				document.getElementById('post-response-content').textContent = JSON.stringify(response);
			} else {
				console.log("Error in network request: " + request.statusText);
			}
		});

		// send the form data
		req.send(JSON.stringify(data));
	});
}