/**
 * Filename: automobile.js
 * Author: Daniel Stoyer
 * Date: Jul 7, 2017
 * 
 * The merge sort javascript code was modified from code found at:
 * http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/
 */

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function(showType) {
    	var string = "";
    	if (showType) {
    		string += this.year + " " + this.make + " " + this.model + " " + this.type;
    	} else {
    		string += this.year + " " + this.make + " " + this.model;
    	}
    	return string;
    }
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/* This function sorts arrays using an arbitrary comparator. 
 * You pass it a comparator and an array of objects appropriate for that comparator
 * and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index
 */
function sortArr( comparator, array ){
    /*your code here*/
	
	var showType = false;
	
	if (comparator.name === "typeComparator") {
		showType = true;
	}
	
	function mergeSort(arr)
	{
	    if (arr.length < 2)
	        return arr;
	 
	    var middle = parseInt(arr.length / 2);
	    var left   = arr.slice(0, middle);
	    var right  = arr.slice(middle, arr.length);
	 
	    return merge(mergeSort(left), mergeSort(right));
	}
	 
	function merge(left, right)
	{
	    var result = [];
	 
	    while (left.length && right.length) {
	        if (comparator(left[0], right[0])) {
	            result.push(left.shift());
	        } else {
	            result.push(right.shift());
	        }
	    }
	 
	    while (left.length)
	        result.push(left.shift());
	 
	    while (right.length)
	        result.push(right.shift());
	 
	    return result;
	}
	 
	return mergeSort(array);
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator(auto1, auto2){
    /* your code here*/
	return auto1.year >= auto2.year ? true : false;
}

/*This compares two automobiles based on their make. It is case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator(auto1, auto2){
    /* your code here*/
	return auto1.make.toLowerCase() <= auto2.make.toLowerCase() ? true : false;
}

/* This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). 
 * It is case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator(auto1, auto2){
    /* your code here*/
	var types = {
		'roadster': 4,
		'pickup': 3,
		'suv': 2,
		'wagon': 1,
		'other': 0
	};
	var type1 = auto1.type.toLowerCase();
	var type2 = auto2.type.toLowerCase();
	var val1 = 0;
	var val2 = 0;
	switch (type1) {
		case 'roadster':
			val1 = types.roadster;
			break;
		case 'pickup':
			val1 = types.pickup;
			break;
		case 'suv':
			val1 = types.suv;
			break;
		case 'wagon':
			val1 = types.wagon;
			break;
		default:
			val1 = types.other;
	}
	
	switch (type2) {
	case 'roadster':
		val2 = types.roadster;
		break;
	case 'pickup':
		val2 = types.pickup;
		break;
	case 'suv':
		val2 = types.suv;
		break;
	case 'wagon':
		val2 = types.wagon;
		break;
	default:
		val2 = types.other;
	}
	
	if (val1 === val2) {
		return yearComparator(auto1, auto2);
	}
	
	return val1 > val2 ? true : false;
}

/**
 * takes the comparator used and the array to be sorted and prints the logMe() of each automobile of the sorted array.
 * @param comparator
 * @param array
 * @returns
 */
function printAutomobiles(comparator, array) {
	
	// construct a string to describe the comparator used, a switch is used so that we don't have to use multiple log statements.
	var compDesc = "";
	var show = false;
	switch (comparator.name) {
	case "yearComparator":
		compDesc += "year";
		break;
	case "makeComparator":
		compDesc += "make";
		break;
		break;
	case "typeComparator":
		compDesc += "type";
		show = true;
		break;
		break;
	}

	console.log("The cars sorted by " +compDesc+ " are:")
	
	array = sortArr(comparator, array);
	
	for (var auto in array) {
		console.log("("+array[auto].logMe(show)+")");
	}
}

console.log("*****");
printAutomobiles(yearComparator, automobiles);
console.log("");
printAutomobiles(makeComparator, automobiles);
console.log("");
printAutomobiles(typeComparator, automobiles);
console.log("*****");
/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */
