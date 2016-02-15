var OPEN_WEATHER_MAP_KEY = '883dd2f4f91dc1a2b2580c100ea0389a';
var weatherApiUrl = null;

document.addEventListener('DOMContentLoaded', initPostFormListener);
document.addEventListener('DOMContentLoaded', initWeatherFormListener);
document.addEventListener('DOMContentLoaded', forceSingleWeatherFormInput);

// Toggle the weather API url and data based on user interaction with form
function forceSingleWeatherFormInput () {
	document.getElementById('weather-city').oninput = function() {
		document.getElementById('weather-zip').value = "";
		weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + this.value + ",us&units=imperial&appid=" + OPEN_WEATHER_MAP_KEY;
	}
	document.getElementById('weather-zip').oninput = function() {
		document.getElementById('weather-city').value = "";
		weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=" + this.value + ",us&units=imperial&appid=" + OPEN_WEATHER_MAP_KEY;
	}
}

// send weather data request when user submits weather form
function initWeatherFormListener() {
	document.getElementById('weather-request').addEventListener('submit', function() {
		event.preventDefault();

		// prepare request
		var req = new XMLHttpRequest();
		req.open("GET", weatherApiUrl, true);

		// display response on load
		req.addEventListener('load', function() {
			var response = JSON.parse(req.responseText);
			if (response.cod == "200") {
				var response = JSON.parse(req.responseText);

				// update condition text
				document.getElementById('condition').textContent = response.weather[0].main;
				document.getElementById('temperature').textContent = response.main.temp + " degrees";
				document.getElementById('humidity').textContent = response.main.humidity + " percent humidity";

				// update weather icon
				document.getElementById('icon').innerHTML = '';
				var weatherIcon = document.createElement('img');
				weatherIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
				document.getElementById('icon').appendChild(weatherIcon);
			} else {
				document.getElementById('weather-response-content').textContent = '';
				alert(response.message);
			}
		});

		// send request
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
				var submitted_data = JSON.parse(response.data);
				document.getElementById('post-response-content').textContent = "Your name is " + submitted_data.name + " and your favorite color is " + submitted_data.favorite_color + ".";
			} else {
				console.log("Error in network request: " + request.statusText);
			}
		});

		// send the form data
		req.send(JSON.stringify(data));
	});
}