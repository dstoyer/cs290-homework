/**
 * Filename: fix_closure.js
 * Author: Daniel Stoyer
 * Date: Jul 7, 2017
 */

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        result.push( function(idx) {
    		return function(){
    			console.log('item[' + list[idx] + '] ' + list[idx]);
			}; 
        }(i));
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