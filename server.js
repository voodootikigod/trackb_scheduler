var express = require("express");
var redis = require("redis");
var year = "2012"
var sessions_per_day = 20;
var schedule = [
	[],				// First Day
	[]				// Second Day
];


var client = redis.createClient(port, host, auth)
var app = express.createServer(
	  express.logger()
	, express.bodyParser()
);
var SCHEDULE_KEY = year+'schedule';



client.get(SCHEDULE_KEY, function (err, buffer) {
	var data = buffer.toString();
	if (buffer) {
		schedule = JSON.parse(buffer);
	}
	app.get("/schedule.json", function (req, res) {
		res.send(schedule);
	})
	app.post("/schedule/:day/:slot", function (req, res) {
		var errors = [];
		
		var dayidx = parseInt(req.params.day,10);
		var slotidx = parseInt(req.params.slot,10);
		var title = req.body.title;
		var name = req.body.name;
		var av_confirm = req.body.av_confirm;
		var email = req.body.email;
		
		if (isblank(name) || name.length < 2)
			errors.push("A real name, or else!") 
	  if (isblank(title) || title.length < 2)
		  errors.push("Give us a punchy title.")
		if (isblank(email) || !email.match(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/) || EMAIL_ADDRESSES.indexOf(email) < 0)
		  errors.push("Email must be the same as what you provided when registering.")
		if (av_confirm != "1")
		  errors.push("You have to let us make you famous.");
		if (0 > dayidx || 1 < dayidx)	
			errors.push("You must specify a valid day for your timeslot.");
		if (0 > slotidx || sessions_per_day <= slotidx)	
			errors.push("You must specify a valid time for your timeslot.");
		if (schedule[dayidx][slotidx]) 
			errors.push("The speaking slot requested has already been filled. Try another slot.");
		if (errors.length == 0) {
			schedule[dayidx][slotidx] = {
				name: name,
				title: title
			};
			res.send(schedule);
			redis.set(year+'schedule', JSON.stringify(schedule));
		} else {
			res.send(errors, 500);
		}
		
	})
	
	
	app.listen(process.env.PORT || 3000);
});










function isblank(str) {
  if (!str) { 	//no value
		return true;
	} else {
		try {
			return (str.replace(/^\s+|\s+$/, '') === ""); //empty string
		} catch (e) {		// not a string
			return false;
		}
	}
}