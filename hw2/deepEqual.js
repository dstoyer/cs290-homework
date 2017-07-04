/**
 * Filename: deepEqual.js
 * Author: Daniel Stoyer
 * Date: 03 July 2017
 */

function deepEqual(obj1, obj2) {
	
	// if the arguments are not the same type
	if(typeof obj1 != typeof obj2) {
		return false;
	}
	
	// since we know that the arguments are of the same type, if obj1 is an object and not null, then do some comparison
	if ((typeof obj1 == "object" && obj1 != null) && obj2 != null) {
		
		// if the number of properties differ
		if (Object.keys(obj1).length != Object.keys(obj2).length) {
	        return false;
		}
		
		for ( var key in obj1) {

			if (!(key in obj2)) {
				 return false;
			 }

			// if the key is an object, call deepEqual() again.
			if (typeof obj1[key] == "object") {
				if(!deepEqual(obj1[key], obj2[key])) {
					return false;
				}
			} else if (obj1[key] !== obj2[key]) {
				return false;
			}
		}
	// otherwise we have values and need to check if they are equal
	} else if (obj1 !== obj2) {
		return false;
	}
  // nothing returned false, so the objects must be equal
  return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log("console.log(deepEqual(obj, obj))");
console.log(deepEqual(obj, obj));
// → true
console.log("console.log(deepEqual(obj, {here: 1, object: 2}))");
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log("console.log(deepEqual(obj, {here: {is: \"an\"}, object: 2}))");
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

var obj2 = {here: {is: "an"}, object: 2, another:{test: 3}};
console.log("console.log(deepEqual(obj2, obj2))");
console.log(deepEqual(obj2,obj2));
// → true

console.log("console.log(deepEqual(obj2,{here: {is: \"an\"}, object: 2, another:{test: 4}}))");
console.log(deepEqual(obj2,{here: {is: "an"}, object: 2, another:{test: 4}}));
// → false

console.log("console.log(deepEqual(obj2,{here: {is: \"an\"}, object: 2, another:{test2: 4}}))");
console.log(deepEqual(obj2,{here: {is: "an"}, object: 2, another:{test2: 3}}));
// → false

console.log("console.log(deepEqual(null, null))");
console.log(deepEqual(null, null));
//→ true


console.log("console.log(deepEqual(obj2,{here: {is: \"an\"}, object: 2}))");
console.log(deepEqual(obj2,{here: {is: "an"}, object: 2}));
// → false

console.log("console.log(deepEqual(obj2, null))");
console.log(deepEqual(obj2, null));
//→ true

console.log("console.log(deepEqual(null, obj2))");
console.log(deepEqual(null, obj2));
//→ true