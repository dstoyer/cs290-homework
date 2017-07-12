/**
 * Filename: fix_closure.js
 * Author: Daniel Stoyer
 * Date: Jul 7, 2017
 */

/* **** Original broken code ****
//function buildList(list) {
//    var result = [];
//    for (var i = 0; i < list.length; i++) {
//        var item = 'item' + list[i];
//        result.push( function() {alert(item + ' ' + list[i])} );
//    }
//    return result;
//}
// 
//function testList() {
//    var fnlist = buildList([1,2,3]);
//    // using j only to help prevent confusion - could use i
//    for (var j = 0; j < fnlist.length; j++) {
//        fnlist[j]();
//    }
//}
**********************************/

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        result.push( function(idx) {
    		return function(){
    			var item = 'item[' + list[idx] + '] ';
    			console.log(item + list[idx]);
			}; 
        }(i)); // The last part (i) calls the function immediately.
    }
    return result;
}
 
function testList() {
    var fnlist = buildList(['Tom','Dick','Harry']);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();