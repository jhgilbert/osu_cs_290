var OPEN_WEATHER_MAP_KEY = '883dd2f4f91dc1a2b2580c100ea0389a';
var weatherApiUrl = null;

document.addEventListener('DOMContentLoaded', initPostFormListener);
document.addEventListener('DOMContentLoaded', initWeatherFormListener);
document.addEventListener('DOMContentLoaded', forceSingleWeatherFormInput);

function forceSingleWeatherFormInput () {
	document.getElementById('weather-city').oninput = function() {
		document.getElementById('weather-zip').value = "";
		weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + this.value + ",us&appid=" + OPEN_WEATHER_MAP_KEY;
	}
	document.getElementById('weather-zip').oninput = function() {
		document.getElementById('weather-city').value = "";
		weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=" + this.value + ",us&appid=" + OPEN_WEATHER_MAP_KEY;
	}
}

function initWeatherFormListener() {
	document.getElementById('weather-request').addEventListener('submit', function() {
		event.preventDefault();
		var req = new XMLHttpRequest();
		req.open("GET", weatherApiUrl, true);
		req.addEventListener('load', function() {
			var response = JSON.parse(req.responseText);
			if (response.cod == "200") {
				var response = JSON.parse(req.responseText);
				document.getElementById('weather-response-content').textContent = JSON.stringify(response);
			} else {
				document.getElementById('weather-response-content').textContent = '';
				alert(response.message);
			}
		});
		req.send(null);
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