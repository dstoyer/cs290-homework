/**
 * Filename: script.js
 * Author: Daniel Stoyer
 * Date: Jul 16, 2017
 *
 * Creates an interactive 4x4 table.
 */
var displayText = "<H1>HW Assignment: DOM and Events</H1>";

document.body.innerHTML = displayText;

var introText = document.createTextNode(
		"When the page is loaded the upper left, non-header cell of the table should be 'selected'." +
		" This is denoted by it having a thicker border than the other cells. If you push the directional" +
		" buttons other cells should be selected instead. So if you press the right button, cell 1,1 should " +
		"no longer be selected and 2,1 should be selected instead. If you are already on the top row and hit " +
		"'up' nothing should happen (you should not be able to move into the header cells). Likewise if you are " +
		"all the way right and hit right or all the way at the bottom and hit down. Hitting the \"Mark Cell\" " +
		"button should permanently change the background of the selected cell to yellow. This should persist even" +
		" after other cells are selected or marked."
		);
var addTextDiv = document.createElement("div");
addTextDiv.setAttribute("id", "body_div");
document.body.appendChild(addTextDiv);

//var body_div = document.getElementById("body_div");
//body_div.appendChild(introText);
//body_div.style.color = "blue";
addTextDiv.appendChild(introText);
addTextDiv.style.color = "blue";
// Start table
var interactiveTable = document.createElement("TABLE");
interactiveTable.setAttribute("id", "interactive");
document.body.appendChild(interactiveTable);

// nested for loops to create rows and cells of table elements

for(var i = 1; i < 5; i++) {
	var tRow = document.createElement("TR");
	tRow.setAttribute("id", "i");
	interactiveTable.appendChild(tRow);

	for (var j = 1; j < 5; j++) {
		var cellType = "";
		var cellText = "";
		if (i === 1) {
			cellType += "TH";
			cellText += "Header "+j;
		} else {
			cellType += "TD";
			cellText += "" +j +" , "+ (i-1);
		}
		var cell = document.createElement(cellType);
		cell.setAttribute("id", ""+ i + j);
		cell.appendChild(document.createTextNode(cellText));
		cell.style.textAlign = "center";
		tRow.appendChild(cell)
	}
}

// Navigation button section
var buttonDiv = document.createElement("div");
buttonDiv.setAttribute("id", "buttonDiv");
document.body.appendChild(buttonDiv);
buttonDiv.appendChild(document.createTextNode("Use these buttons to navigate the table above."));

var buttonTable = document.createElement("TABLE");
var buttonClass = "buttonClass";
buttonTable.setAttribute("id", "buttonTable");
buttonTable.setAttribute("class", buttonClass);
buttonTable.style.textAlign = "center";
document.body.appendChild(buttonTable);

// Need 3 rows and 3 cols
var topRow = document.createElement("TR");
topRow.setAttribute("class", buttonClass);
// first cell
topRow.appendChild(document.createElement("TD"));
// up arrow cell
var upCell = document.createElement("TD");
upCell.setAttribute("id", "upCell");
upCell.setAttribute("class", buttonClass);
// up arrow button
var upButton = document.createElement("button");
upButton.setAttribute("id", "upButton");
upButton.appendChild(document.createTextNode("Up"));
upCell.appendChild(upButton);
topRow.appendChild(upCell);
//// last cell of row 1
topRow.appendChild(document.createElement("TD"));
buttonTable.appendChild(topRow);


var middleRow = document.createElement("TR");
middleRow.setAttribute("class", buttonClass);
// left arrow cell
var leftCell = document.createElement("TD");
leftCell.setAttribute("id", "leftCell");
leftCell.setAttribute("class", buttonClass);
leftCell.style.border = "0px";
// left arrow button
var leftButton = document.createElement("button");
leftButton.setAttribute("id", "leftButton");
leftButton.appendChild(document.createTextNode("Left"));
leftCell.appendChild(leftButton);
middleRow.appendChild(leftCell);
// middle cell
middleRow.appendChild(document.createElement("TD"));
//left arrow cell
var rightCell = document.createElement("TD");
rightCell.setAttribute("id", "rightCell");
rightCell.setAttribute("class", buttonClass);
rightCell.style.border = "0px solid white";
// right arrow button
var rightButton = document.createElement("button");
rightButton.setAttribute("id", "rightButton");
rightButton.appendChild(document.createTextNode("Right"));
rightCell.appendChild(rightButton);
middleRow.appendChild(rightCell);

buttonTable.appendChild(middleRow);

var bottomRow = document.createElement("TR");
bottomRow.setAttribute("class", buttonClass);
// first cell
bottomRow.appendChild(document.createElement("TD"));
// down arrow cell
var downCell = document.createElement("TD");
downCell.setAttribute("id", "downCell");
downCell.setAttribute("class", buttonClass);
downCell.style.border = "0px solid white";
// down arrow button
var downButton = document.createElement("button");
downButton.setAttribute("id", "downButton");
downButton.appendChild(document.createTextNode("Down"));
downCell.appendChild(downButton);
bottomRow.appendChild(downCell);
//// last cell of row 1
bottomRow.appendChild(document.createElement("TD"));
buttonTable.appendChild(bottomRow);


// top-center is "up" arrow
// middle-left is "left" arrow
// middle-right is "right" arrow
// bottom-center is "down" arrow