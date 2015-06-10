var todo = Alloy.Models.todo;
$.alarmSw.value = false;
$.dateBtn.title = "oggi";
$.iv.image = "/appicon.png";

var net = require('net');
net.enablePushNotifications(showToDo);
var acs = require('acs');

var dueDate = new Date();
var dueTime = new Date();

// it is used to update on ListToDo selection the dateBtn button formatting properly the date
todo.on("change:duedate", function(e) {
	//$.dateBtn.title = String.formatDate(e.duedate, "medium");
	
	Ti.API.info(e.attributes.duedate);
	var d = new Date(e.attributes.duedate*1000);
	$.dateBtn.title = String.formatDate(d, "medium");
	
});

function saveToDo() {

	if (!( typeof ($.iv.image) == "string")) {
		var filename = Ti.Filesystem.applicationDataDirectory + $.titoloTxt.value.replace(/ /g, "_") + "_" + new Date().getTime() + ".jpg";
		var f = Ti.Filesystem.getFile(filename);
		f.write($.iv.image.imageAsThumbnail(100, 0, 3));
	};
	var newToDo = Alloy.createModel("todo", {
		title : $.titoloTxt.value,
		location : $.locationTxt.value,
		alarm : $.alarmSw.value,
		duedate : dueDate,
		path : filename
	});
	//alert(JSON.stringify(newToDo));
	
	
	
	//Ti.API.info(newToDo.toJSON());
	if (newToDo.isValid()) {
		newToDo.save();
		//net.saveToDo(newToDo.attributes);
		if (Ti.Network.online) {
			acs.saveToDo(newToDo.attributes);
			//alert($.alarmSw.value);
			if ($.alarmSw.value) {
				acs.registerAlarm(newToDo.attributes);
			}
		}
		Alloy.Collections.todo.add(newToDo);
		Alloy.Globals.tabgroup.setActiveTab(1);
		// reset the form
        $.titoloTxt.value = "";
        $.locationTxt.value = "";
        $.alarmSw.value = false;
        $.dateBtn.title = "oggi";
        $.iv.image = "/appicon.png";

	} else {
		alert("Inserire il titolo");
	}
}

function showToDo(e) {
	//Ti.API.info(JSON.stringify(e));
	//Ti.API.info(JSON.stringify(e.payload));
	//Ti.API.info(JSON.stringify(JSON.parse(e.payload).todo));
	if (Ti.Platform.name === 'android') {
		var todo = JSON.parse(e.payload).todo;
	} else {
		var todo = e.data.todo;
	}
	$.titoloTxt.value = todo.title;
	$.locationTxt.value = todo.location;
	$.alarmSw.value = todo.alarm;
	$.dateBtn.title = todo.duedate;
	$.iv.image = todo.path;
	Alloy.Globals.tabgroup.setActiveTab(0);	
}

function chooseImg() {
	Ti.Media.openPhotoGallery({
		success : function(e) {
			$.iv.image = e.media;
		}
	});
}

function focusLocation() {
	Ti.API.info('titolo inserito');
	$.locationTxt.focus();
}

function blurKeyboard() {
	$.titoloTxt.blur();
	$.locationTxt.blur();
}

function openDueDateWindow() {
	var dueDateController = Alloy.createController("DueDateWindow", {
		parent : $
	});
	//dueDateController.setParent($);
	//dueDateController.setPickerDefaultDate($.dateBtn.title);
	var dueDateWindow = dueDateController.getView();
	/*if (OS_IOS) {
		Ti.UI.iOS.createNavigationWindow({
			modal : true,
			window : dueDateWindow.open()
		}).open();
	} else { */
		dueDateWindow.open();
	/*} */
	
}

function geolocateToDo() {
	var mapWin = Alloy.createController("MapWindow", {
		location : $.locationTxt.value,
		parent : $
	});
	mapWin.getView().open({
		modal : true
	});
}

function logout() {
	if (Ti.Network.online) {
		acs.unsubscribeForPush();
		acs.logout();
		var loginWin = Alloy.createController("Login").getView();
		loginWin.open({
			modal : true
		});
	}
}

exports.setDueDate = function(date) {
	dueDate = date;
	if (OS_ANDROID) {
                Ti.API.info("solo android");
                var hours = dueTime.getHours();
                var min = dueTime.getMinutes();
                dueDate.setHours(hours);
                dueDate.setMinutes(min);

        }

    $.dateBtn.title = String.formatDate(dueDate, "medium");
    Ti.API.info("in setDueDate");
    Ti.API.info(dueDate.toLocaleString());
}

exports.setDueTime = function(time) {
        dueTime = time;
        var hours = time.getHours();
        var min = time.getMinutes();
        dueDate.setHours(hours);
        dueDate.setMinutes(min);
        $.dateBtn.title = String.formatDate(dueDate, "medium");
        Ti.API.info("in setDueTime");
        Ti.API.info(dueDate.toLocaleString());
}

