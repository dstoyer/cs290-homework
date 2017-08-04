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
var mysql = require('./dbcon.js');

var expressApp = expressFunc();

var handleBars = require('express-handlebars').create({defaultLayout:'main'});

expressApp.engine('handlebars', handleBars.engine);
// expressApp.set('view.engine', 'handlebars') allows us to omit the ".handlebars" extention from the render(...) function calls
// e.g. res.render('home.handlebars') --> res.render('home')
expressApp.set('view engine', 'handlebars'); 
expressApp.set('port', 3500);

var session = require('express-session');
var bodyParser = require('body-parser');
expressApp.use(bodyParser.urlencoded({extended: true}));
expressApp.use(bodyParser.json());
expressApp.use(session({
	"secret" : "SuperSecretPassword",
	"resave" : "false",
	"saveUninitialized" : "false"
}));

expressApp.use(expressFunc.static('common'));

expressApp.get('/', function(req,res) {
////	var context = {};
//	var serverResponse = "";
//	console.log('query name: ['+req.query.name+']');
//	console.log('session name: ['+req.session.name+']');
//	if(req.query.name && req.query.name !== ""){
//		req.session.name = req.query.name;
//		console.log('Server: GET from client received! ['+req.session.name+']');
//		serverResponse += '{"name": "'+req.query.name+'"}';
//	} else {
//		req.session.name = req.query.name;
//		serverResponse += 'No name given.'
//		console.log('No name given.');
//		res.render('home');
//		return;
//	}
	var context = {};
	mysql.pool.query("SELECT * FROM workouts", (err, rows) => {
		if (err) {throw err}
		console.log("Data retrieved from the database:");
		console.log(rows);
		context.tableRows = rows;
		res.render('home', context);
	});
	//TODO query the workout table and get all values and send to the client.
//	res.send(serverResponse);

//	console.log(res);
//	simpleTest.simpleTest();
//	console.log(context.getHTML);
});

expressApp.get('/resetTable',function(req,res,next){
	var context = {};
	mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
		var createString = "CREATE TABLE workouts("+
			"id INT PRIMARY KEY AUTO_INCREMENT,"+
			"name VARCHAR(255) NOT NULL,"+
			"reps INT,"+
			"weight INT,"+
			"date DATE,"+
			"lbs BOOLEAN)";
			mysql.pool.query(createString, function(err){
			context.results = "Table reset";
			res.send("Table reset"); // TODO look into what to actually send back to the client. We want to display an empty/new table on the client if the db table is reset.
		})
	});
});

expressApp.post('/insertWorkout', function(req, res) {
	  var context = {};
	  
	  console.log('req.body: ' + JSON.stringify(req.body));
	  console.log('req.query: ' + JSON.stringify(req.query));
	  
	  console.log('Server: Name from client: ['+req.body['name']+']')
	  mysql.pool.query("INSERT INTO workouts (`name`) VALUES (?)", [req.body['name']], function(err, result){
	    if(err){
	    	console.log(err);
	    	res.send(err);
//	      next(err);
	      return;
	    }
	    context.results = "Inserted id " + result.insertId;
	    res.send(context.results);
//	    res.render('home',context);
	  });	
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

