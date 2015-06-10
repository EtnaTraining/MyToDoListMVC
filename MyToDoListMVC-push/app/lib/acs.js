/*
Library to wrap app-specific functionality around the ACS APIs
*/
// a couple local variables to save state
var currentUser = null;
var loggedIn = false;





var Cloud = require('ti.cloud');
if (OS_ANDROID) {
	//Ti.API.info("in acs");
	var CloudPush = require('ti.cloudpush');
	//CloudPush.enabled = true;
}


//Cloud.debug = true;

// Persist the user's login status -- by default, they're
// logged out when the app closes
/*var sid = Ti.App.Properties.getString('sessionid');
 if(sid) {
 Cloud.sessionId = sid;
 loggedIn = true;
 var me = Cloud.Users.showMe(function(e) {
 currentUser = e.users[0];
 });
 } */

exports.isLoggedIn = function() {
	return loggedIn;
};

// Add createUser() here, accepts username, password, and callback function
// ACS API requires password & confirm, but we do the checking elsewhere so use the same for both here
// API also logs in the user, so make sure to set loggedIn and currentUser appropriately
exports.createUser = function(username, password, callback) {
	Cloud.Users.create({
		username : username,
		password : password,
		password_confirmation : password
	}, function(e) {
		if (e.success) {
			Ti.App.Properties.setString('sessionid', e.meta.session_id);
			Ti.API.info("session id" + e.meta.session_id); 
			currentUser = e.users[0];
			loggedIn = true;
			callback(e);
		} else {
			Ti.API.info('Error' + JSON.stringify(e));
			loggedIn = false;
			currentUser = null;
			callback(e);
		}
	});
};

exports.loginUser = function(username, password, callback) {
	Cloud.Users.login({
		login : username,
		password : password,
	}, function(e) {
		if (e.success) {
			//Ti.App.Properties.setString('sessionid',e.meta.session_id);
			currentUser = e.users[0];
			loggedIn = true;
			callback(e);
		} else {
			Ti.API.info('Error' + JSON.stringify(e));
			loggedIn = false;
			currentUser = null;
			callback(e);
		}
	});
};

// Add saveFugitive() here, accepts a fugitive object, store the
// custom object in a class named 'fugitive'
// check logged in state, Ti.API.info() out a success/failure message
exports.saveToDo = function(todo) {
	var data = {
		classname : 'ToDo',
		fields : todo
	};
	Cloud.Objects.create(data, function(e) {
		Ti.API.info('Fugitive saved to cloud: ' + (e.success) ? 'Success' : 'Oopsie' + JSON.stringify(e));
	});
}

exports.getToDos = function(_callback) {
	Ti.API.info("Current User: " + JSON.stringify(currentUser));
	Cloud.Objects.query({
		classname : 'ToDo',
		where : {
			user_id : currentUser.id
		}

	}, function(e) {
		if (e.success) {
			//Ti.API.info("query con successo");
			//Ti.API.info("cars: " + JSON.stringify(e.ToDo))
			_callback(e.ToDo);
		}
	})
}
// Add logout() here, make sure to set loggedIn and currentUser appropriately
// and clear the app property
exports.logout = function() {
	Cloud.Users.logout(function(e) {
		if (e.success) {
			currentUser = null;
			loggedIn = false;
			//Ti.App.Properties.setString('sessionid', '');
		}
	});
};

exports.subscribeForPush = function() {
	Ti.API.info("Subscribing for push");
	if (OS_ANDROID) {
		var androidpush = true;
		//CloudPush.enabled = true;
		//Ti.API.info("is CloudPush.enabled?? " + CloudPush.enabled);
		//Ti.API.info(CloudPush);
	}
	
	if (Ti.Network.remoteNotificationsEnabled || androidpush) {
		Cloud.PushNotifications.subscribe({
			channel : "alarm",
			device_token : Ti.App.Properties.getString("deviceToken"),
			type: Ti.Platform.name === 'iPhone OS' ? 'ios' : 'gcm'
		}, function(e) {
			if (e.success) {
				Ti.API.info("Subscribed");
			} else {
				Ti.API.info("Error during push subscription: " + JSON.stringify(e));
			}
		});
	}

};

exports.unsubscribeForPush = function() {
	if (Ti.Network.remoteNotificationsEnabled || CloudPush.enabled) {
		Cloud.PushNotifications.unsubscribe({
			channel : "alarm",
			device_token : Ti.App.Properties.getString("deviceToken"),
			type: Ti.Platform.name === 'iPhone OS' ? 'ios' : Ti.Platform.name
		}, function(e) {
			if (e.success) {
				Ti.API.info("Unsubscribed");
			} else {
				Ti.API.info("Error during push unsubscription: " + JSON.stringify(e));
			}
		});
	}
}; 

exports.registerAlarm = function(todo) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onerror = function(e) {
		alert("Error: " + JSON.stringify(e));
	};
	xhr.open("POST", "https://7faa5b494f1aa0223a460f1425207ab1fa5b82b3.cloudapp-enterprise.appcelerator.com/register");
	//10.58.186.47
	//xhr.open("POST", "http://10.58.186.47:8080/register");
	todo.id = currentUser.id;
	Ti.API.info(JSON.stringify(todo));
	todo.duedate = todo.duedate.toISOString();
	xhr.send(todo);
};
/*

 // Add your code to export the login() method here
 // accepts username, password, and callback (function)
 // make sure to set loggedIn and currentUser appropriately
 exports.login = function(username, password, callback) {
 Cloud.Users.login({
 login: username,
 password: password
 }, function (e) {
 if (e.success) {
 currentUser = e.users[0];
 loggedIn = true;
 Ti.App.Properties.setString('sessionid',e.meta.session_id);
 callback(loggedIn);
 } else {
 Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
 loggedIn = false;
 currentUser = null;
 callback(loggedIn);
 }
 });
 };*/

