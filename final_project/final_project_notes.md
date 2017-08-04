# Final Project

## Problem Description  
For this assignment you need to make a database backed website that features Ajax interaction.

At the end of this description you will find code which will create a handler you can visit to set up your database table. It contains all the fields needed to make a simple workout tracker.

+ name - the name of the exercise
+ reps - the number of times the exercise was performed
+ weight - the weight of the weights used
+ date - the date the exercise was performed
+ lbs - a boolean indicating if the measurement is in lbs or kg. 1 indicates lbs, 0 indicates kgs.

## Requirements  
+ Single page application
+ top of page has form for new table entry
+ page shows table with completed exercises
+ ### table requirements
	+ header row with columns names
	+ each row has edit and delete buttons
		+ editing can be done on separate page.
		+ edit form is pre-populated with existing data.
		+ saving edit takes back to the main page (possible to cancel?)
+ All interactions must happen via AJAX.

## Deliverables  
+ URL comment with submission
+ zip file with source files and package.json

# NOTES

I think that a good place to look for an example is the toDo with Open Weather.
+ That app has a form with text entry and creates a list, which can easily be
replaced with a table.
+ It also handles deleting using forms.
+ I'll need to work in using a database to store information.
+ Use a JSON object to get the information to add to the HTML table.

+ I'm having a hard time wrapping my head around how we are to use DOM
  effectively with Handlebars. It seems like the whole point of using Handlebars
is to not have to deal with the DOM. I must be missing some conceptual piece.
	+ I can access the DOM from within Handlebar templates much the same way I
	  was using it before (non-Handlebars). This does not seem to meet the
requirements of the assignment, however.

+ I've been struggling with the concept of "one-page website" and Handlebars. I
  believe that the framework we have been using has all been one page, since we
are using one main layout with the boilerplate html and body tags and filling in
the body with views.

+ Client to server means sending a get or post request.

+ How does the server (via Handlebars) respond (send info back)?

	+ To test this:
	+ [DONE] Create simple js script that sends a get request and waits for a reply.
	+ [DONE] Find out how to reply to a get request via Handlebars.
		+ Simple strings can be sent via Handlebars within get() or post()
		  functions by using res.send("some string here").

## Build out database functionality

+ Must create table, if it doesn't exist.
+ Must query database on page load to see if there is existing data to display.

+ Create a button that resets a table in the database.
	+ Client-side, ajax get request to reset table. Receive confirmation.
	+ Server-side, app.get handler to reset table sends POST request to database
	  to delete and re-create the table then sends confirmation to the client.
+ Create a simple submit button that sends data to a database.

## Naming conventions
+ Names for getting info from database.
	+ table rows are exercises
	+ should the functions be named by desired data, or actions taken (e.g.
	  getExercise vs. dbRequest)?

