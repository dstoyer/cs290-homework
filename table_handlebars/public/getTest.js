/**
 * Filename: getTest.js
 * Author: Daniel Stoyer
 * Date: Aug 2, 2017
 */

function getRequest() {
	document.getElementById('getResult').addEventListener('click', function(event) {
		console.log("Button clicked.");
		var query = "";
		query += 'name='+document.getElementById('testName').value;
		
		var url = 'http://localhost:3500?'+query;
		
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.addEventListener('load', function() {
			var response;
			if (req.status >= 200 && req.status < 400) {
				console.log('Client: GET response received!');
				console.log('Data: ['+req.responseText+']');
			}
		});
		req.send(null);
		event.preventDefault();
	});
}
