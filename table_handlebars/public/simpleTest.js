/**
 * Filename: simpleTest.js
 * Author: Daniel Stoyer
 * Date: Aug 1, 2017
 */

function createH1() {
	var titleH1 = document.createElement("H1");
	titleH1.setAttribute("id", "title1");
	console.log("Attempting to append text to the html body");
	titleH1.textContent = "Testing appending text via DOM through handlebars";
	document.body.appendChild(titleH1);
}
createH1();
//module.exports.simpleTest = createH1;
