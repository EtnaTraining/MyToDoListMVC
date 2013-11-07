/*
	Library to wrap app-specific functionality around the ACS APIs
*/
// a couple local variables to save state
var currentUser = null;
var loggedIn = false;

var Cloud = require('ti.cloud');
Cloud.debug = true;

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
		username: username,
		password: password,
		password_confirmation: password
	}, function (e) {
	    if (e.success) {
	        Ti.App.Properties.setString('sessionid',e.meta.session_id);
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
		login: username,
		password: password,
	}, function (e) {
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
		classname: 'ToDo',
		fields: todo
	};
	Cloud.Objects.create(data, function(e) {
		Ti.API.info('Todo saved to cloud: ' + (e.success) ? 'Success' : 'Oopsie'+JSON.stringify(e));
	});
}

exports.getToDos = function(_callback) {
	Ti.API.info("Current User: " + JSON.stringify(currentUser));
	Cloud.Objects.query({
		classname: 'ToDo',
		where: {
			user_id: currentUser.id	
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
	Cloud.Users.logout(function (e) {
	    if (e.success) {
	        currentUser = null;
	        loggedIn = false;
	        //Ti.App.Properties.setString('sessionid', '');
	    }
	});		
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





