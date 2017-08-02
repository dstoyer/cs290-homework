/**
 * Filename: cs290_tests.js Author: Daniel Stoyer Date: Jul 10, 2017
 * 
 * Tests for examples found during CS290 study/research.
 */

var http = require('http');

http.createServer(function(req,res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world!');
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
