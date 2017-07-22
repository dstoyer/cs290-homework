/**
 * Filename: utils.js
 * Author: Daniel Stoyer
 * Date: Jul 21, 2017
 * 
 * Convenient utility functions 
 */

	
function createElement(element) {
	return document.createElement(element);
}

function createTextNode(text) {
	return document.createTextNode(text);
}

function getElementById(id) {
	return document.getElementById(id);
}

function sleep(millis) {
	return new Promise(resolve => setTimeout(resolve, millis));
}

// displays a "Loading..." dialog in the text view while data is being downloaded.
// The "." character is appended to the end of the "Loading" string every second while running.
// The condition object must reference an object with initial value {boolean: true}
// If the object name is myCondition, then myCondition.boolean must be set to false when the data has downloaded for the 
// while loop to stop.
// elementId is the id of the html element you want "Loading" to appear in.
async function loading(elementId, condition) {
	// displays loading dialog
	getElementById(elementId).innerHTML = "Loading ";
	while(condition.boolean) {
		getElementById(elementId).appendChild(document.createTextNode(".")); 
		await sleep(1000); 
	}
	// reset the condition to the original state so that subsequent calls will activate the loop.
	condition.boolean = true;
}