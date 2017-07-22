/**
 * Filename: script.js
 * Author: Daniel Stoyer
 * Date: Jul 16, 2017
 *
 * Creates an interactive 4x4 table.
 * When the page is loaded the upper left, non-header cell of the table should be 'selected'. 
 * This is denoted by it having a thicker border than the other cells. If you push the directional 
 * buttons other cells should be selected instead. So if you press the right button, cell 1,1 
 * should no longer be selected and 2,1 should be selected instead.
 * If you are already on the top row and hit 'up' nothing should happen (you should not be able to
 * move into the header cells). Likewise if you are all the way right and hit right or all the way at the bottom and hit down.
 * Hitting the "Mark Cell" button should permanently change the background of the selected cell to yellow. This should persist even after other cells are selected or marked.
 */

var titleH1 = document.createElement("H1");
titleH1.textContent = "HW Assignment: DOM and Events";
document.body.appendChild(titleH1);

var introText = "Select cells using the direction buttons, marked cells have a yellow background."
var addTextDiv = document.createElement("div");
addTextDiv.setAttribute("id", "body_div");
document.body.appendChild(addTextDiv);

addTextDiv.innerHTML = introText;
addTextDiv.style.color = "brown";
// Start table

var tableDiv = document.createElement("div");
tableDiv. setAttribute("id", "tableDiv");
//tableDiv.appendChild(interactiveTable);
document.body.appendChild(tableDiv);

// change these values to make the table bigger or smaller.
var rowSize = 4;
var colSize = 5;

createTable(rowSize, colSize, false);

/**
 * Set updateTable to true when using to change the table size from the page form.
 * @param rSize
 * @param cSize
 * @param updateTable
 * @returns
 */
function createTable(rSize, cSize, updateTable) {
	
	var interactiveTable = document.createElement("TABLE");
	interactiveTable.setAttribute("id", "interactive");
	interactiveTable.style.borderCollapse = "collapse";
	
	if (document.getElementById("interactive")) {
		document.getElementById("tableDiv").removeChild(document.getElementById("interactive"));
	}
	
	for(var i = 0; i < rSize; i++) {
		var tRow = document.createElement("TR");
		tRow.setAttribute("id", "row"+i);
		interactiveTable.appendChild(tRow);
	  // we start at 1 to simplify presentation
		for (var j = 1; j < cSize; j++) {
			var cellType = "";
			var cellText = "";
			if (i === 0) {
				cellType += "TH";
				cellText += "Header "+j;
			} else {
				cellType += "TD";
				cellText += "" +j +" , "+ (i);
			}
			var cell = document.createElement(cellType);
			cell.setAttribute("id", "cell"+ i + j);
			cell.style.border = "1px solid black";
			cell.style.padding = "3px 8px";
			cell.style.textAlign = "center";
			cell.appendChild(document.createTextNode(cellText));
			tRow.appendChild(cell);
		}
	}
	document.getElementById("tableDiv").appendChild(interactiveTable);
	
	if (updateTable) {
		rowIdx = 1;
		colIdx = 1;
		selectedCell = document.getElementById("cell"+rowIdx+colIdx);
		// set it to be "selected";
		selectedCell.style.border = selected;
		selectedCell.style.borderColor = "blue";
	}
}

// proof of concept, getting the cell ID and changing the style.
// This works.
// document.getElementById("cell22").style.border = "3px solid black";


/* ****** Navigation button section ******/
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
var btnTableSize = 3;
buttonTable.appendChild(createBtnTableRow([{id: "upButton",idx: 1, text: "Up"}], btnTableSize));
buttonTable.appendChild(createBtnTableRow([{id: "leftButton",idx: 0, text: "Left"},{id: "rightButton",idx: 2, text: "right"}], btnTableSize));
buttonTable.appendChild(createBtnTableRow([{id: "downButton",idx: 1, text: "Down"}], btnTableSize));

/**
 * btnObjects should contain button properties with idx values increasing in value, left to right. 
 * idx should correspond with the table cell desired to contain the button.
 * @param btnObjects = [{id: "button1", idx: 0, text: "Left"}, {id: "button2", idx: 2, text: "Right"}]
 * @param rowSize = number of cells in the row
 * @returns
 */
function createBtnTableRow(btnObjects, rSize) {
	var row = document.createElement("tr");
	row.setAttribute("class", buttonClass);
	
	var buttonTotal = btnObjects.length;
	var btnIdx = 0;
	
	for (var i = 0; i < rSize; i++) {
		var cell = document.createElement("td");
		cell.setAttribute("class", buttonClass);
		cell.style.border = "0px";
		
		// Check for a button until we have created them all
		if (btnIdx < buttonTotal) {
			// if this is the cell we want the button in, create a new button and append it.
			if (i === btnObjects[btnIdx].idx) {
				// add button
				var button = document.createElement("button");
				button.setAttribute("id", btnObjects[btnIdx].id);
				button.appendChild(document.createTextNode(btnObjects[btnIdx].text));
				cell.appendChild(button);
				// go to next button object
				btnIdx++;
			}
		} 
		
		row.appendChild(cell);
		
	}
	return row;
}

/* **************************/
// table selection


var selectDiv = document.createElement("div");
selectDiv.setAttribute("id", "selectDiv");
document.body.appendChild(selectDiv);

selectDiv.appendChild(document.createTextNode("Use the button below to mark a cell of the table."));


//Set initial values for navigating the table starting at 1.
var rowIdx = 1;
var colIdx = 1;

//cell border values for selection
var selected = "2px solid black";
var unselect = "1px solid black";
// The currently selected cell
var selectedCell = document.getElementById("cell"+rowIdx+colIdx);
// set it to be "selected";
selectedCell.style.border = selected;
selectedCell.style.borderColor = "blue";

/* **** selection button *****/
var selectionBtn = document.createElement("button");
selectionBtn.setAttribute("id","selectionBtn");
selectionBtn.innerHTML = "Mark Cell";
selectionBtn.setAttribute("onclick", "markCell()");

function markCell() {
	selectedCell.style.backgroundColor = "yellow";
}

document.body.appendChild(selectionBtn);

// Set the onclick listeners
leftButton.setAttribute("onclick", "navigateTable('leftButton')");
rightButton.setAttribute("onclick", "navigateTable('rightButton')");
upButton.setAttribute("onclick", "navigateTable('upButton')");
downButton.setAttribute("onclick", "navigateTable('downButton')");



/**
 * Changes the table cell border attributes based on the cell ID.
 * The cell IDs are by location within the table, so "cell11" is the upper-left-most cell and "cell44" is the lower-right-most cell.
 * cell index numbers are checked against the boundaries (1 and tableSize - 1) to make sure we don't try to call an invalid cell ID.
 *
 * This functions acts on and changes global variables selectedCell, rowIdx, and colIdx
 * @param buttonID
 * @returns
 */
function navigateTable(buttonID) {

	var rSize = rowSize - 1;
	var cSize = colSize -1;
	switch (document.getElementById(buttonID).id) {
		case "leftButton":
			if (colIdx > 1) {
				colIdx--;
			} else {
				return;
			}
			updateTableSelection(rowIdx, colIdx);
			break;
		case "rightButton":
			if (colIdx < cSize) {
				colIdx++;
			} else {
				return;
			}
			updateTableSelection(rowIdx, colIdx);
			break;
		case "upButton":
			if (rowIdx > 1) {
				rowIdx--;
			} else {
				return;
			}
			updateTableSelection(rowIdx, colIdx);
			break;
		case "downButton":
			if (rowIdx < rSize) {
				rowIdx++;
			} else {
				return;
			}
			updateTableSelection(rowIdx, colIdx);
			break;
		default:
			return
	}

  // function to update the location and cell border
	function updateTableSelection(r, c) {

		selectedCell.style.border = unselect;
		selectedCell.style.borderColor = "black";
		selectedCell = document.getElementById("cell"+r+c);
		selectedCell.style.border = selected;
		selectedCell.style.borderColor = "blue";

	}
}

/*
 * Create ability to change the table size
 */

document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

var changeTableForm = document.createElement("form");
document.body.appendChild(changeTableForm);

var changeTableFS = document.createElement("fieldset");
changeTableFS.setAttribute("id", "changeTableFS");
changeTableFS.appendChild(document.createTextNode("Enter number of rows and columns and click \"Change Table\" to change the table size."))

var changeTableFSLegend = document.createElement("legend");
changeTableFSLegend.textContent = "Change Table Size";
changeTableFS.appendChild(changeTableFSLegend);
changeTableFS.appendChild(document.createElement("br"));


changeTableFS.appendChild(document.createTextNode("Row Size: "));
var tableRowInput = document.createElement("input");
tableRowInput.setAttribute("type", "number");
tableRowInput.setAttribute("name", "rowInput");
changeTableFS.appendChild(tableRowInput);
changeTableFS.appendChild(document.createElement("br"));

changeTableFS.appendChild(document.createTextNode("Column Size: "));
var tableColInput = document.createElement("input");
tableColInput.setAttribute("type", "number");
tableColInput.setAttribute("name", "colInput");
changeTableFS.appendChild(tableColInput);
changeTableFS.appendChild(document.createElement("br"));

var changeTableBtn = document.createElement("button");
changeTableBtn.appendChild(document.createTextNode("Change Table"));
changeTableBtn.setAttribute("onClick", "tableFromForm(form)");
changeTableFS.appendChild(changeTableBtn);
changeTableForm.appendChild(changeTableFS);

function tableFromForm(form) {
	// need to add one to the total for the number of columns
	rowSize = form.rowInput.value;
	colSize = parseInt(form.colInput.value) + 1;
	
	// We need to be sure all of the DOM content is loaded, otherwise createTable(...) will fail.
	document.addEventListener("DOMContentLoaded", createTable(rowSize, colSize, true));
	event.preventDefault();
}

