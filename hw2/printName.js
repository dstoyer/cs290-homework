/**
 * Filename: printName.js
 * Author: Daniel Stoyer
 * Date: 02 July 2017
 */

console.log("Lets make sure JavaScript is working.");
var name = "Stoyer"; //Replace this with your first name
console.log("The unicode characters of your name are:")
for (var i = 0; i < name.length; i++){
	console.log(name.charCodeAt(i));
}