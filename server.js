var express = require("express");
var redis = require('redis-url').connect(process.env.REDISTOGO_URL);

var sessions_per_day = 20;
var schedule = {
	max: sessions_per_day,
	year: 2012,
	lineup: [
		[],				// First Day
		[]				// Second Day
	]	
};


var app = express.createServer(
	  express.logger()
	, express.bodyParser()
	, express.static(__dirname+"/public")
);
var SCHEDULE_KEY = '2012_schedule';



redis.get(SCHEDULE_KEY, function (err, buffer) {
	if (buffer) {
		var data = buffer.toString();
		schedule = JSON.parse(data);
	}
	app.get("/schedule.json", function (req, res) {
		if (req.query.callback) {
			res.send(";;"+req.query.callback+"("+JSON.stringify(schedule)+");");
		} else {
			res.send(schedule);	
		}
		
	});
	app.get("/",function (req, res ) {
	  res.send("ohai");
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
		if (schedule.lineup[dayidx][slotidx]) 
			errors.push("The speaking slot requested has already been filled. Try another slot.");
		if (errors.length == 0) {
			schedule.lineup[dayidx][slotidx] = {
				name: name,
				title: title
			};
			redis.set(year+'schedule', JSON.stringify(schedule));
			res.send(schedule);
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