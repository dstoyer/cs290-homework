/**
 * Filename: postJSONinfo.js
 * Author: Daniel Stoyer
 * Date: Jul 17, 2017
 * 
 */

/** getJsonObject(form)
 * Submits a string to http://httpbin.org/post which returns a JSON object with the string in the data field.
 */
function getJsonObject(form) {
	
	var string = form.string.value;
	var req = new XMLHttpRequest();
	
	// create a json object if the form was empty
	if("" === string) {
		string = 'Default Value:<br>{"coord":{"lon":-123.26,"lat":44.56},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":58.6,"pressure":1017,"humidity":59,"temp_min":51.8,"temp_max":64.4},"visibility":16093,"wind":{"speed":6.93,"deg":290},"clouds":{"all":1},"dt":1500360900,"sys":{"type":1,"id":2285,"message":0.0037,"country":"US","sunrise":1500381940,"sunset":1500436347},"id":5720727,"name":"Corvallis","cod":200}}';
	}
	req.open("POST", "http://httpbin.org/post", true);
	req.setRequestHeader("Content-type", "application/json");
	req.addEventListener("load", function(){
		if(req.status >=200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
		}
		
		if (!response) {
			response = "Did not get any JSON data for: " + string;
		} 
		// update the weather result data
		var jsonPara = document.createElement("p");
		jsonPara.innerHTML = response.data;
		jsonPara.setAttribute("id", "jsonResult");
		// remove any existing weather results
		if (document.getElementById("jsonResult")) {
			document.getElementById("jsonData").removeChild(document.getElementById("jsonResult"));
		}
		document.getElementById("jsonData").appendChild(jsonPara);
		document.getElementById("jsonData").insertAdjacentHTML("beforeend", "<br>Raw Data:<br>"+JSON.stringify(response));
	});
	
	req.send(string);
	event.preventDefault();
}
