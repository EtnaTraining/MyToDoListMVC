var currentUser = null;

var loggedIn = false;

var Cloud = require("ti.cloud");

Cloud.debug = true;

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