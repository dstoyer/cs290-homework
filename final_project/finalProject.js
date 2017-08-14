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

var expressFunc = require('express');
var mysql = require('./dbcon.js');

var expressApp = expressFunc();

var handleBars = require('express-handlebars').create({
	defaultLayout:'main',
	helpers: {
				'getUnitHelper': (bool) => {
					if (bool){
						return "lbs";
					} 
					return "kg";
				},
				'formatDate': (date) => {
					var dateArray = date.toString().split("-");
					var newDate = dateArray[1]+"/"+dateArray[2]+"/"+dateArray[0];
					return newDate;
				}
			}
});

function formatDate(date) {
	var dateArray = date.toString().split("-");
	var newDate = dateArray[1]+"/"+dateArray[2]+"/"+dateArray[0];
	return newDate;
}

expressApp.engine('handlebars', handleBars.engine);
// >>expressApp.set('view.engine', 'handlebars')<< allows us to omit the ".handlebars" extention from the render(...) function calls
expressApp.set('view engine', 'handlebars'); 
expressApp.set('port', 3500);

var session = require('express-session');
var bodyParser = require('body-parser');
expressApp.use(bodyParser.urlencoded({extended: false}));
expressApp.use(bodyParser.json());
expressApp.use(session({
	"secret" : "SuperSecretPassword",
	"resave" : "false",
	"saveUninitialized" : "false"
}));

var dateFormat = require('dateformat');

expressApp.use(expressFunc.static('common'));

expressApp.post('/', function(req,res) {

	if(req.body['updateWorkout']){
		  if(req.body.date == "") {
				 var today = new Date();
				 req.body.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		  }
		mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, units=? WHERE id=? ",
			[req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.units, req.body.id],
			function(err, result){
			if(err){
			  return;
			}
			// we must nest the select query to ensure that we get an updated view of the table.
			mysql.pool.query("SELECT * FROM workouts", function(err, rows) {
				var context = {};
				if (err) {
					throw err;
				}
				context.tableRows = rows;
				res.render('home', context);
			});
		});
		return;
	}
	
	mysql.pool.query("SELECT * FROM workouts", (err, rows) => {
		if (err) {
			throw err;
		}
		var context = {};
		context.tableRows = rows;
		res.render('home', context);
	});

});

expressApp.get('/', function(req,res) {

	var context = {};
	mysql.pool.query("SELECT * FROM workouts", (err, rows) => {
		if (err) {
			throw err;
		}
		context.tableRows = rows;
		res.render('home', context);
	});

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
			"units BOOLEAN)";
			mysql.pool.query(createString, function(err){
			context.results = "Table reset";
			res.send("Table reset");
		})
	});
});

expressApp.post('/insertWorkout', function(req, res) {
	  
	  if (req.body.name.length > 255) {
		  req.body.name = req.body.name.slice(0,255);
	  }
	  if(req.body.date == "") {
			 var today = new Date();
			 req.body.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	  }	  

	  mysql.pool.query("INSERT INTO workouts (name, reps, weight, date, units) VALUES (?,?,?,?,?)", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.units], function(err, result){
	    if(err){
	    	res.send(err);
	      return;
	    }
		mysql.pool.query("SELECT * FROM workouts WHERE id = ?",[result.insertId], (err, rows) => {
			if (err) {throw err}
			rows[0].date = formatDate(rows[0].date)
			res.send(JSON.stringify(rows[0]));
		});
	  });	
});

expressApp.post('/deleteWorkout', function(req, res) {
	  
	  
	  mysql.pool.query("DELETE FROM workouts WHERE id = ?",[req.body.id], function(err, result){
	    if(err){
	    	console.log("error deleteing: "+err);
	    	res.send(err);
	      return;
	    }
	    // the DELETE was successful (no errors) so send the id back to the client.
	    res.send(JSON.stringify(req.body));
	  });	
});

expressApp.post('/editWorkout', function(req, res){
	mysql.pool.query("SELECT * FROM workouts WHERE id = ?",[req.body.id], function(err, result){
		if(err){
			next(err);
			return;
		}
		var context = {};
		context.workout = result[0];
		res.render('edit', context);
	});
});

expressApp.use(function(req,res){
	res.status(404);
	res.render('404');
});

expressApp.use(function(err, req, res, next){
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

expressApp.listen(expressApp.get('port'), function(){
	console.log('Express started on http://localhost:' + expressApp.get('port') + '; press Ctrl-C to terminate.');
});