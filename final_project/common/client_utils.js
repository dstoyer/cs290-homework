/**
 * Filename: getTest.js
 * Author: Daniel Stoyer
 * Date: Aug 2, 2017
 */

function postWorkout() {
	document.getElementById('workoutBtn').addEventListener('click', function(event) {
		

		var workout = {};
		workout.name = document.getElementById('workoutName').value;
		
		// we want to proceed only if there is a name
		if(!inputValidation(true)) {
			return;
		}
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
		document.getElementById('workoutWeight').value = 0;
		document.getElementById('workoutDate').value = "";
		document.getElementById('kg').checked = false;
		document.getElementById('lbs').checked = true;
		
		var req = new XMLHttpRequest();
		req.open('POST', '/insertWorkout', true);
		req.setRequestHeader("Content-type", "application/json");
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
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

						if ("date" === data) {
							// we only want the year-month-day, not the time and time zone offset.
							tdContent += rowJSON[data].slice(0,10);
						} else if ("units" === data){
							if (rowJSON[data]) {
								tdContent += "lbs";
							} else {
								tdContent += "kg";
							}
						} else {
							if ("name" === data) {
								td.setAttribute("class", "nameCell");
								td.setAttribute("title", rowJSON[data]);
							}
							tdContent += rowJSON[data];
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
				btnTd.setAttribute("class", "editCell");
				btnTd.appendChild(editForm);
				btnTd.appendChild(document.createTextNode(" "));
				btnTd.appendChild(delBtn);
				row.appendChild(btnTd);
				tableBody.appendChild(row);
			}
		});

		req.send(JSON.stringify(workout));
		event.preventDefault();
	});
}

function deleteWorkout(workoutId) {
	
	var req = new XMLHttpRequest();
	req.open('POST', '/deleteWorkout', true);
	req.setRequestHeader("Content-type", "application/json");
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			var resJSON = JSON.parse(req.responseText);
			var tableBody = document.getElementById("tableBody");
			tableBody.removeChild(document.getElementById(resJSON.id));
			if (tableBody.children.length === 0 ){
				var noDataRow = document.createElement('tr');
				noDataRow.setAttribute('id', 'noDataRow');
				var noDataTd = document.createElement('td');
				noDataTd.setAttribute('colspan', '5');
				noDataTd.appendChild(document.createTextNode('No Workouts Saved.'));
				noDataRow.appendChild(noDataTd);
				tableBody.appendChild(noDataRow);
			}
		}
	});
	var payload = {};
	payload.id = workoutId;
	req.send(JSON.stringify(payload));
	event.preventDefault();
}

function editWorkout(workoutId) {
	var req = new XMLHttpRequest();
	req.open('POST', '/editWorkout', true);
	req.setRequestHeader("Content-type", "application/json");
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			// Success, nothing to do.
		} else {
			console.log("Client: editWorkout() Error status code: "+req.status);
		}
	});
	var payload = {};
	payload.id = workoutId;
	req.send(JSON.stringify(payload));
	event.preventDefault();
}

function getUnitName(bool) {
	if (bool){
		return "lbs";
	} else {
		return "kg";
	}
}

function resetTable() {
	document.getElementById('resetTableBtn').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		req.open('GET', '/resetTable', true);
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				//console.log('Client: table reset!');
				//console.log('Data: ['+req.responseText+']');
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

function submitValidation(workoutName) {
	var name = "";
	// we need to account for validating from the main page, which uses a custom button listener
	// and submitting from the edit page, which uses the default form submit.
	if(workoutName.name) {
		name += workoutName.name.value;
	} else {
		name = workoutName;
	}
	if (name.trim() === "") {
		alert("Workout Name cannot be empty!");
		return false;
	}
	return true;
}

function inputValidation(isSubmit) {
	var inputField = document.getElementById('workoutName');
	var message = "";
	var isValid = true;
	if(inputField) {
		if(inputField.value.trim() == ""){
			getErrorDisplay(inputField, true, isSubmit, "Workout Name cannot be empty!");
			isValid = false;
		} else {
			getErrorDisplay(inputField, false, isSubmit, message);
		}
		
		var repField = document.getElementById("workoutReps");
		if (repField.value < 0 || repField.value === '') {
			getErrorDisplay(repField, true, isSubmit, "Workout Reps must be positive!");
			isValid = false;
		} else {
			getErrorDisplay(repField, false, isSubmit, message);
		}
		
		var weightField = document.getElementById("workoutWeight");
		if (weightField.value < 0 || weightField.value === '') {
			getErrorDisplay(weightField, true, isSubmit, "Workout Weight must be positive!");
			isValid = false;
		} else {
			getErrorDisplay(weightField, false, isSubmit, message);
		}
		
	} else {
		inputField = document.getElementById('editName');
		if(inputField.value.trim() == ""){
			getErrorDisplay(inputField, true, isSubmit, "Workout Name cannot be empty!");
			isValid = false;
		} else {
			getErrorDisplay(inputField, false, isSubmit, message);
		}
		var repField = document.getElementById("editReps");
		if (repField.value < 0 || repField.value === '') {
			getErrorDisplay(repField, true, isSubmit, "Workout Reps must be positive!");
			isValid = false;
		} else {
			getErrorDisplay(repField, false, isSubmit, message);
		}
		
		var weightField = document.getElementById("editWeight");
		if (weightField.value < 0 || weightField.value === '') {
			getErrorDisplay(weightField, true, isSubmit, "Workout Weight must be positive!");
			isValid = false;
		} else {
			getErrorDisplay(weightField, false, isSubmit, message);
		}
	}

	return isValid;
}

function getErrorDisplay(nameField, isError, isSubmit, message) {

	if(isError && isSubmit) {
		alert(message);
		return false;
	} else {
		if(isError){
			nameField.style.backgroundColor = "red";	
			return false;
		} else {
			nameField.style.border = "1px solid DarkGray";
			nameField.style.backgroundColor = "transparent";
		}
	}
	return true;
}
