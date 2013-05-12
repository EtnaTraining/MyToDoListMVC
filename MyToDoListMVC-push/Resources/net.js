var uuid = Ti.App.Properties.getString("uuid", "");

if (!uuid) {
    uuid = Ti.Platform.createUUID();
    Ti.App.Properties.setString("uuid", uuid);
}

Ti.API.info(uuid);

exports.getToDos = function(_callback) {
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function() {
        _callback(JSON.parse(xhr.responseText).data);
    };
    xhr.onerror = function(e) {
        alert("Error: " + JSON.stringify(e));
    };
    xhr.open("GET", "http://todolist2.nodester.com/" + uuid);
    xhr.send();
};

exports.saveToDo = function(todo) {
    var xhr = Ti.Network.createHTTPClient();
    xhr.onerror = function(e) {
        alert("Error: " + JSON.stringify(e));
    };
    xhr.open("POST", "http://todolist2.nodester.com/" + uuid);
    xhr.send(todo);
};

exports.enablePushNotifications = function(_callback) {
    if ("Simulator" == Titanium.Platform.model) {
        alert("The simulator does not support push!");
        return;
    }
    Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: function(e) {
            Ti.App.Properties.setString("deviceToken", e.deviceToken);
            Ti.API.info("Device token:" + e.deviceToken);
        },
        error: function() {
            Ti.API.info("Failed to register for push");
            return;
        },
        callback: _callback
    });
    Ti.API.info("PushNotificationsEnabled: " + JSON.stringify(Ti.Network.remoteNotificationsEnabled) + "\nDeviceUUID: " + Ti.Network.remoteDeviceUUID + "\nremoteNotificationTypes :" + JSON.stringify(Ti.Network.remoteNotificationTypes));
};