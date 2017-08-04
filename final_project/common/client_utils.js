/**
 * Filename: getTest.js
 * Author: Daniel Stoyer
 * Date: Aug 2, 2017
 */

function postWorkout() {
	document.getElementById('workoutBtn').addEventListener('click', function(event) {
		console.log("Workout button clicked.");
		var workout = {};
		workout.name = document.getElementById('workoutName').value;
		// reset the workout text value to be empty
		document.getElementById('workoutName').value = "";
		
		var url = 'http://localhost:3500/insertWorkout';
		
		var req = new XMLHttpRequest();
		req.open('POST', '/insertWorkout', true);
		req.setRequestHeader("Content-type", "application/json");
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				console.log('Client: workout POST response received!');
				console.log('Data: ['+req.responseText+']');
				//TODO add workout to table here.
			}
		});
		console.log("Client: Sending workout: ["+JSON.stringify(workout)+"]")
		req.send(JSON.stringify(workout));
		event.preventDefault();
	});
}

function resetTable() {
	document.getElementById('resetTableBtn').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		req.open('GET', '/resetTable', true);
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				console.log('Client: table reset!');
				console.log('Data: ['+req.responseText+']');
			}
		});
		req.send(null);
		event.preventDefault();
	});
}
