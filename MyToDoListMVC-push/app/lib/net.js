var uuid = Ti.App.Properties.getString("uuid", "");
if (!uuid) {
	uuid = Ti.Platform.createUUID();
	Ti.App.Properties.setString("uuid", uuid);
}
Ti.API.info(uuid);

//var pushDeviceToken = "f248844a54aa5c05d62e6b54270e4a7544e5b886b302046b5edaa2d2eb2cbf05";
//Ti.App.Properties.setString("deviceToken", pushDeviceToken);

exports.getToDos = function(_callback) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		_callback(JSON.parse(xhr.responseText).data);
	};
	xhr.onerror = function(e) {
		alert("Error: " + JSON.stringify(e));
	}
	xhr.open("GET", "http://todolist2.nodester.com/" + uuid);
	xhr.send();
}

exports.saveToDo = function(todo) {
	var xhr = Ti.Network.createHTTPClient();
	/*xhr.onload = function() {

	 }; */
	xhr.onerror = function(e) {
		alert("Error: " + JSON.stringify(e));
	};
	xhr.open("POST", "http://todolist2.nodester.com/" + uuid);
	xhr.send(todo);
}



exports.enablePushNotifications = function(_callback) {
	
	if (Ti.Platform.name === 'iPhone OS') {
		if (Titanium.Platform.model == 'Simulator') {
			alert('The simulator does not support push!');
			return;
		}
		
		Ti.Network.registerForPushNotifications({
			types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
			success : function(e) {
				Ti.App.Properties.setString("deviceToken", e.deviceToken);
				Ti.API.info("Device token:" + e.deviceToken);
			},
			error : function(e) {
				Ti.API.info("Failed to register for push");
				return
			},
			callback : _callback
		});
		Ti.API.info("PushNotificationsEnabled: " + JSON.stringify(Ti.Network.remoteNotificationsEnabled) +
			"\nDeviceUUID: " + Ti.Network.remoteDeviceUUID + "\nremoteNotificationTypes :" +
			JSON.stringify(Ti.Network.remoteNotificationTypes) 
		);
	} else if (Ti.Platform.name === 'android') {
		Ti.API.info("Enabling push for android");
		var androidPush = require('ti.cloudpush');
		androidPush.retrieveDeviceToken({
			success: function(e) {
				Ti.App.Properties.setString("deviceToken", e.deviceToken);
				Ti.API.info("Device token is:" + e.deviceToken);
				androidPush.enabled = true;	
				androidPush.addEventListener('callback', _callback);
			},
			error: function(e) {
				Ti.API.info("Failed to register for push");
				return
			}
		});		
	}
	
	//Ti.Network.unregisterForPushNotifications();
}
