/**
 * Filename: jsFunctions.js
 * Author: Daniel Stoyer
 * Date: 02 July 2017
 */

console.log("Calling addTwoNumbers() before it is defined.");
console.log(addTwoNumbers(4,2));

function addTwoNumbers(num1, num2) {
	return num1 + num2;
}

console.log("Calling myFunction() assigned to variable before it is defined (should throw a TypeError exception).");

try {
	myFunction();
} catch (exception) {
	console.log(exception);
}

var myFunction = function () {
	console.log("Ah, there we go, we have a function!!");
}

console.log("Calling myFunction() assigned to variable after it is defined (should work now).");

myFunction();
