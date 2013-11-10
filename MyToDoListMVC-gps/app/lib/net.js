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
	}
	xhr.open("GET", "https://6fd6170b9a42d16f84226e323f57a7cf4289c1b4.cloudapp.appcelerator.com/" + uuid);
	xhr.send();
}

exports.saveToDo = function(todo) {
	var xhr = Ti.Network.createHTTPClient();
	/*xhr.onload = function() {

	 }; */
	xhr.onerror = function(e) {
		alert("Error: " + JSON.stringify(e));
	}
	xhr.open("POST", "https://6fd6170b9a42d16f84226e323f57a7cf4289c1b4.cloudapp.appcelerator.com/" + uuid);
	xhr.send(todo);
}
