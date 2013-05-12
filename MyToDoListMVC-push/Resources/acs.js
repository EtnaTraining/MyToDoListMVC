var currentUser = null;

var loggedIn = false;

var Cloud = require("ti.cloud");

var CloudPush;

exports.isLoggedIn = function() {
    return loggedIn;
};

exports.createUser = function(username, password, callback) {
    Cloud.Users.create({
        username: username,
        password: password,
        password_confirmation: password
    }, function(e) {
        if (e.success) {
            Ti.App.Properties.setString("sessionid", e.meta.session_id);
            currentUser = e.users[0];
            loggedIn = true;
            callback(e);
        } else {
            Ti.API.info("Error" + JSON.stringify(e));
            loggedIn = false;
            currentUser = null;
            callback(e);
        }
    });
};

exports.loginUser = function(username, password, callback) {
    Cloud.Users.login({
        login: username,
        password: password
    }, function(e) {
        if (e.success) {
            currentUser = e.users[0];
            loggedIn = true;
            callback(e);
        } else {
            Ti.API.info("Error" + JSON.stringify(e));
            loggedIn = false;
            currentUser = null;
            callback(e);
        }
    });
};

exports.saveToDo = function(todo) {
    var data = {
        classname: "ToDo",
        fields: todo
    };
    Cloud.Objects.create(data, function(e) {
        Ti.API.info("Fugitive saved to cloud: " + e.success ? "Success" : "Oopsie" + JSON.stringify(e));
    });
};

exports.getToDos = function(_callback) {
    Ti.API.info("Current User: " + JSON.stringify(currentUser));
    Cloud.Objects.query({
        classname: "ToDo",
        where: {
            user_id: currentUser.id
        }
    }, function(e) {
        e.success && _callback(e.ToDo);
    });
};

exports.logout = function() {
    Cloud.Users.logout(function(e) {
        if (e.success) {
            currentUser = null;
            loggedIn = false;
        }
    });
};

exports.subscribeForPush = function() {
    (Ti.Network.remoteNotificationsEnabled || CloudPush.enabled) && Cloud.PushNotifications.subscribe({
        channel: "alarm",
        device_token: Ti.App.Properties.getString("deviceToken"),
        type: "ios"
    }, function(e) {
        e.success ? Ti.API.info("Subscribed") : Ti.API.info("Error during push subscription: " + JSON.stringify(e));
    });
};

exports.unsubscribeForPush = function() {
    (Ti.Network.remoteNotificationsEnabled || CloudPush.enabled) && Cloud.PushNotifications.unsubscribe({
        channel: "alarm",
        device_token: Ti.App.Properties.getString("deviceToken"),
        type: "ios"
    }, function(e) {
        e.success ? Ti.API.info("Unsubscribed") : Ti.API.info("Error during push unsubscription: " + JSON.stringify(e));
    });
};

exports.registerAlarm = function(todo) {
    var xhr = Ti.Network.createHTTPClient();
    xhr.onerror = function(e) {
        alert("Error: " + JSON.stringify(e));
    };
    xhr.open("POST", "https://1dfaae1a42a3c3061fcd4f8c50cc535c02e812ab.cloudapp.appcelerator.com/register");
    todo.id = currentUser.id;
    Ti.API.info(JSON.stringify(todo));
    todo.duedate = todo.duedate.toISOString();
    xhr.send(todo);
};