# Notes for HW Assignment: DOM and Events

## Creating a table using DOM and JS

+ Start by creating a table object
+ Code the rows and columns by hand.
+ Convert to create table programmatically.
	+ Set up using nested for loops?
	+ Use index numbers to fill out cell content and ID's.

+ To change cell colors, the the ID of the currently selected cell and change
the style.color value.

## Tracking navigation of the table
+ Could set the table size with two values (4,4), assign the values to variables
an then track the mouse clicks on the arrows with the variables.
	+ If the table is 4x4: then we want the vertical movement to start at 1 and
end at 3, the horizontal to start at 0 and end at 3. The values would be
concatenated together to be the id of the cells, the id would then be used to
update the html and to keep track of the current position.

+ Could also navigate by using DOM navigation, checking to make sure to not
navigate to the "header" row and to only go to the first and last child in the
rows.
	+ This would be significantly more difficult than using ID values.
