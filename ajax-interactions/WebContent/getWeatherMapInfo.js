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
	
	if (cityName) {
		query += "q="+cityName;
	} else {
		query += "zip="+zipCode;
	}
	
	var req = new XMLHttpRequest();
	
	var url = "http://api.openweathermap.org/data/2.5/weather?"+query+",us"+"&units=imperial&APPID=aa224681db2a563756dd2041bc0eb5ca";
	
	req.open("GET", url);
	req.addEventListener("load", function(){
		if(req.status >=200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
		}
		
		if (!response) {
			response = "Did not get any weather data for " + cityName + " " + zipCode;
		} 
		// update the weather result data
		var weatherResult = document.createElement("p");
		weatherResult.appendChild(document.createTextNode(JSON.stringify(response)));
		weatherResult.setAttribute("id", "weatherResult");
		// remove any existing weather results
		if (document.getElementById("weatherResult")) {
			document.getElementById("weatherDiv").removeChild(document.getElementById("weatherResult"));
		}
		document.getElementById("weatherDiv").appendChild(weatherResult);
	});
	
	req.send(url);
	event.preventDefault();

}