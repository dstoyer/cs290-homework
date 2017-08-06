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
		workout.reps = document.getElementById('workoutReps').value;
		workout.weight = document.getElementById('workoutWeight').value;
		workout.date = document.getElementById('workoutDate').value;
		// unit values are lbs or kg, default to lbs if kg is not checked.
		// true means lbs, false means kg
		if(document.getElementById('kg').checked){
			workout.units = false;
		} else {
			workout.units = true;
		}
		// reset the workout text value to be empty
		document.getElementById('workoutName').value = "New workout";
		document.getElementById('workoutReps').value = 0;
		document.getElementById('workoutWeight').value = 0;;
		document.getElementById('workoutDate').value = "";
		document.getElementById('kg').checked = false;
		document.getElementById('lbs').checked = false;
		
		var url = 'http://localhost:3500/insertWorkout';
		
		var req = new XMLHttpRequest();
		req.open('POST', '/insertWorkout', true);
		req.setRequestHeader("Content-type", "application/json");
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				console.log('Client: workout POST response received!');
				console.log('Data: ['+req.responseText+']');
				var rowJSON = JSON.parse(req.responseText);
				var tableBody = document.getElementById("tableBody");
				if (document.getElementById("noDataRow")) {
					tableBody.removeChild(document.getElementById("noDataRow"));
				}
				var row = document.createElement("tr");
				row.setAttribute("id", rowJSON.id);
				
				for (var data in rowJSON) {
					// we should not create a table cell for the database row id
					if ("id" !== data) {
						var td = document.createElement("td");
						var tdContent = "";
						if (rowJSON[data]) {
							if ("date" === data) {
								// we only want the year-month-day, not the time and time zone offset.
								tdContent += rowJSON[data].slice(0,10);
							} else {
								tdContent += rowJSON[data];
							}
						}
						td.appendChild(document.createTextNode(tdContent));
						row.appendChild(td);
					}
				}
				var editForm = document.createElement("form");
				editForm.setAttribute("class", "left");
				editForm.setAttribute("action", "/editWorkout");
				editForm.setAttribute("method", "POST");

				var idInput = document.createElement("input");
				idInput.setAttribute("type", "hidden");
				idInput.setAttribute("name", "id");
				idInput.setAttribute("value", rowJSON.id);
				editForm.appendChild(idInput);
				
				var editInput = document.createElement("input");
				editInput.setAttribute("type","submit");
				editInput.setAttribute("id", "editBtn");
				editInput.setAttribute("value", "Edit");
				editForm.appendChild(editInput);
				
				var delBtn = document.createElement("input");
				delBtn.setAttribute("id", "delBtn");
				delBtn.setAttribute("type", "button");
				delBtn.setAttribute("onclick", "deleteWorkout("+rowJSON.id+")");
				delBtn.setAttribute("value", "Delete");

				
				var btnTd = document.createElement("td");
				btnTd.appendChild(editForm);
				btnTd.appendChild(document.createTextNode(" "));
				btnTd.appendChild(delBtn);
				row.appendChild(btnTd);
				tableBody.appendChild(row);
			}
		});
		console.log("Client: Sending workout: ["+JSON.stringify(workout)+"]")
		req.send(JSON.stringify(workout));
		event.preventDefault();
	});
}

function deleteWorkout(workoutId) {
	
	console.log("Delete button clicked.");
	var req = new XMLHttpRequest();
	req.open('POST', '/deleteWorkout', true);
	req.setRequestHeader("Content-type", "application/json");
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			var resJSON = JSON.parse(req.responseText);
			document.getElementById("tableBody").removeChild(document.getElementById(resJSON.id));
		}
	});
	var payload = {};
	payload.id = workoutId;
	req.send(JSON.stringify(payload));
	event.preventDefault();
}

function editWorkout(workoutId) {
	console.log("Edit button clicked.");
	var req = new XMLHttpRequest();
	req.open('POST', '/editWorkout', true);
	req.setRequestHeader("Content-type", "application/json");
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			// Success, nothing to do.
			console.log('Client: editWorkout response: '+req.responseText)
//			document.body.innerHTML = req.responseText;
		} else {
			console.log("Client: editWorkout() Error status code: "+req.status);
		}
	});
	var payload = {};
	payload.id = workoutId;
	req.send(JSON.stringify(payload));
	event.preventDefault();
}

//function updateWorkout(form) {
//	console.log("Update button clicked.");
//	var req = new XMLHttpRequest();
//	req.open('POST', '/updateWorkout', true);
//	req.setRequestHeader("Content-type", "application/json");
//	req.addEventListener('load', function() {
//		if (req.status >= 200 && req.status < 400) {
//			// Success, nothing to do.
//			console.log('Client: updateWorkout response: '+req.responseText)
//			console.log('Client: updateWorkout url: '+req.url)
////			document.body.innerHTML = req.responseText;
//		} else {
//			console.log("Client: editWorkout() Error status code: "+req.status);
//		}
//	});
//	var payload = {};
//	payload.id = workoutId;
//	req.send(JSON.stringify(payload));
//	event.preventDefault();
//}

function resetTable() {
	document.getElementById('resetTableBtn').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		req.open('GET', '/resetTable', true);
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				console.log('Client: table reset!');
				console.log('Data: ['+req.responseText+']');
				var tableBody = document.getElementById("tableBody");
				tableBody.innerHTML = "";
				var tr = document.createElement("tr");
				tr.setAttribute("id", "noDataRow");
				var td = document.createElement('td');
				td.setAttribute("colspan", "5");
				td.appendChild(document.createTextNode("No Workouts Submitted"));
				tr.appendChild(td);
				tableBody.appendChild(tr);
			}
		});
		req.send(null);
		event.preventDefault();
	});
}
