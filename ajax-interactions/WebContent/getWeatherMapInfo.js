/**
 * Filename: getWeatherMapInfo.js
 * Author: Daniel Stoyer
 * Date: Jul 17, 2017
 */


function getWeatherResult(form) {

	var cityName = form.cityName.value;
	var zipCode = form.zipCode.value;
	
	var query = "";
	
	if (cityName && zipCode) {
		alert("Only enter a city name OR a zipcode, not both!");
		return;
	}
	
	if ("" === cityName && "" === zipCode) {
		alert("You must enter one of city name or zip code!");
		return;
	}
	
	if (cityName) {
		query += "q="+cityName;
	} else {
		query += "zip="+zipCode;
	}
	
	var req = new XMLHttpRequest();
	
	var url = "http://api.openweathermap.org/data/2.5/weather?"+query+",us"+"&units=imperial&APPID=aa224681db2a563756dd2041bc0eb5ca";
	
	req.open("GET", url, true);
	req.addEventListener("load", function(){
		var response;
		if(req.status >=200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
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
		} else {
			weatherResult.appendChild(createTextNode("City Name: " + response.name));
			weatherResult.appendChild(createElement("br"));
			weatherResult.appendChild(createTextNode("Current Weather: " + response.weather[0].main+"/"+response.weather[0].description));
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
			weatherResult.appendChild(createElement("br"));
			weatherResult.appendChild(createTextNode("Raw Data:"+JSON.stringify(response)));
			weatherResult.appendChild(createElement("br"));
			weatherResult.appendChild(createElement("br"));
		}
		getElementById("weatherData").appendChild(weatherResult);
	});
	
	req.send(url);
	event.preventDefault();
	
	function createElement(element) {
		return document.createElement(element);
	}
	
	function createTextNode(text) {
		return document.createTextNode(text);
	}
	
	function getElementById(id) {
		return document.getElementById(id);
	}

}