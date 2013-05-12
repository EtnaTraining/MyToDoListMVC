var ACS = require('acs').ACS;
ACS.init('y39tJVdURr55Ya8KCoke4sbwvWhiRh5o', 'NAzdEICU1FS0KND3OQhPsdBBf1OBQHnv');

var cronJob = require('cron').CronJob;

var session_id = "xvpwyHxIwtRfXBnINkg0uRfWAEU";

function index(req, res) {

	res.render('index', {
		title : 'Welcome to Node.ACS!'
	});
}

function registerAlarm(req, res) {

	console.log(req.body);
	res.json(req.body);
	
	var alarmDate = new Date(req.body.duedate);
	console.log("data:" + JSON.stringify(alarmDate));
	console.log(alarmDate);
	console.log(JSON.stringify(alarmDate));
	var job = new cronJob(alarmDate, function() {
		//runs once at the specified date.
		ACS.PushNotifications.notify({
			channel : 'alarm',
			payload : JSON.stringify({
				"alert" : req.body.title,
				"sound" : "default",
				"badge" : 2,
				"todo" : {
					"title" : req.body.title,
					"location" : req.body.location,
					"alarm" : true,
					"duedate" : req.body.duedate,
					"path" : req.body.path
				}
			}),
			session_id : "xvpwyHxIwtRfXBnINkg0uRfWAEU"
		}, function(e) {
			if (e.success) {
				console.log('Success');
				res.json({
					success : true
				});
			} else {
				console.log(e);
				console.log('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				res.json(e);
			}
		});
	},  function() {
		// This function is executed when the job stops
		}
	);
}

function broadcastPush(req, res) {
	console.log("broadcasting push");
	ACS.PushNotifications.notify({
		channel : 'alarm',
		payload : JSON.stringify({
			"alert" : "Allarme todo",
			"sound" : "default",
			"badge" : 2,
			"todo" : {
				"title" : "gigetto",
				"location" : "milano",
				"alarm" : true,
				"duedate" : "10 feb 2013",
				"path" : "/appicon.png"
			}
		}),
		session_id : "xvpwyHxIwtRfXBnINkg0uRfWAEU"
	}, function(e) {
		if (e.success) {
			console.log('Success');
			res.json({
				success : true
			});
		} else {
			console.log(e);
			console.log('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			res.json(e);
		}
	});
}
