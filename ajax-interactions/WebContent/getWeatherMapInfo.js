/**
 * Filename: getWeatherMapInfo.js
 * Author: Daniel Stoyer
 * Date: Jul 17, 2017
 */

/*
 * Example JSON object from Open Weather Map:
 * {"coord":{"lon":-123.26,"lat":44.56},
 * "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],
 * "base":"stations",
 * "main":{"temp":77.31,"pressure":1019,"humidity":39,"temp_min":62.6,"temp_max":84.2},
 * "visibility":16093,
 * "wind":{"speed":8.05,"deg":290},
 * "clouds":{"all":1},
 * "dt":1500684900,
 * "sys":{"type":1,"id":2285,"message":0.0042,"country":"US","sunrise":1500727763,"sunset":1500781743},
 * "id":5720727,
 * "name":"Corvallis",
 * "cod":200}
 */

// loadingWeatherData must be an object so that we can change its values by reference.
var loadingWeatherData = {boolean: true};
function getWeatherResult() {

	getElementById("weatherSubmit").addEventListener('click', function(event) {

		var query = "";
		var weatherEntry = getElementById("weatherEntry").value;

		if ("" === weatherEntry) {
			alert("You must enter a city name or zip code!");
			return;
		}
		
		// checks if the submitted value is a number, if not, then use the city API.
		if (isNaN(weatherEntry)) {
			query += "q="+weatherEntry;
		} else {
			query += "zip="+weatherEntry;
		}
		
		var url = "http://api.openweathermap.org/data/2.5/weather?"+query+",us"+"&units=imperial&APPID=aa224681db2a563756dd2041bc0eb5ca";
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.addEventListener("load", function(){
			var response;
			if(req.status >=200 && req.status < 400) {
				response = JSON.parse(req.responseText);
			}
			// update the weather result data
			var weatherResult = createElement("p");
			weatherResult.setAttribute("id", "weatherResult");
			// remove any existing weather results
			if (getElementById("weatherData")) {
				getElementById("weatherData").removeChild(getElementById("weatherResult"));
			}
			if (!response) {
				weatherResult.appendChild(createTextNode("Did not get any weather data for " + cityName + " " + zipCode));
				loadingWeatherData.boolean = false;
			} else {
				weatherResult.appendChild(createTextNode("City Name: " + response.name));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Current Weather: " + response.weather[0].main+"/"+response.weather[0].description));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Current Humidity: " + response.main.humidity+"%"));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Current Temp: " + response.main.temp+"F"));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Minimum Temp: " + response.main.temp_min+"F"));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Maximum Temp: " + response.main.temp_max+"F"));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Wind Speed and Direction: " + response.wind.speed+"mph -- "+response.wind.deg+"deg"));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Longitude: " + response.coord.lon));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Latitude: " + response.coord.lat));
				weatherResult.appendChild(createElement("br"));
				var googleMap = createElement("iframe");
				googleMap.setAttribute("width", "600");
				googleMap.setAttribute("height", "450");
				googleMap.setAttribute("frameborder", "0");
				googleMap.setAttribute("style", "border:0");
				googleMap.setAttribute("src", "https://www.google.com/maps/embed/v1/place?key=AIzaSyBSN_b-3beXSC5prnsZmxnng2Wli5rN4rI" +
						"&q="+response.name +
						"&center="+response.coord.lat+","+response.coord.lon);
				weatherResult.appendChild(googleMap);
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode("Raw Data:"));
				weatherResult.appendChild(createElement("br"));
				weatherResult.appendChild(createTextNode(JSON.stringify(response)));
				weatherResult.appendChild(createElement("br"));
			}
			loadingWeatherData.boolean = false;
			getElementById("weatherData").appendChild(weatherResult);
		});
		
		req.send(null);
		loading("weatherResult", loadingWeatherData);
		event.preventDefault();
	
	
	});

}
