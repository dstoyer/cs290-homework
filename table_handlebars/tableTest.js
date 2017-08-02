/**
 * Filename: tableTest.js
 * Author: Daniel Stoyer
 * Date: Aug 1, 2017
 */

/**
 * Filename: helloExpress.js
 * Author: Daniel Stoyer
 * Date: Jul 24, 2017
 */

//var pool = mysql.createPool({
//	host: 'localhost',
//	user: 'bob',
//	password: 'bob123',
//	database: 'cs290'
//});
//
//module.exports.pool = pool;
//
//console.log(pool);

//var simpleTest = require('simpleTest.js');
var expressFunc = require('express');


var expressApp = expressFunc();

var handleBars = require('express-handlebars').create({defaultLayout:'main'});

expressApp.engine('handlebars', handleBars.engine);
// expressApp.set('view.engine', 'handlebars') allows us to omit the ".handlebars" extention from the render(...) function calls
// e.g. res.render('home.handlebars') --> res.render('home')
expressApp.set('view engine', 'handlebars'); 
expressApp.set('port', 3500);

var session = require('express-session');
var bodyParser = require('body-parser');
expressApp.use(bodyParser.urlencoded({extended: false}));
expressApp.use(session({
	"secret" : "SuperSecretPassword",
	"resave" : "false",
	"saveUninitialized" : "false"
}));

expressApp.use(expressFunc.static('public'));

expressApp.get('/', function(req,res) {
//	var context = {};
	console.log('query name: ['+req.query.name+']');
	console.log('session name: ['+req.session.name+']');
	if(req.query.name && req.query.name !== ""){
		req.session.name = req.query.name;
		console.log('Server: GET from client received! ['+req.session.name+']');
		var serverResponse = '{"name": "'+req.query.name+'"}';
		res.send(serverResponse);
		return;
	} else {
		req.session.name = req.query.name;
		console.log('Attempting to render "home"');
		res.render('home');
	}

//	console.log(res);
//	simpleTest.simpleTest();
//	console.log(context.getHTML);
});

expressApp.get('/simple', function(req, res) {
	res.render('simple');
});

expressApp.use(function(req,res){
res.status(404);
res.render('404');
});

expressApp.use(function(err, req, res, next){
console.error(err.stack);
res.type('plain/text');
res.status(500);
res.render('500');
});

expressApp.listen(expressApp.get('port'), function(){
  console.log('Express started on http://localhost:' + expressApp.get('port') + '; press Ctrl-C to terminate.');
});

