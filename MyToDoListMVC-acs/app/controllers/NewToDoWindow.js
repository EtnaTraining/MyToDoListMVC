var todo = Alloy.Models.ToDo;
$.alarmSw.value = false;
$.dateBtn.title = "oggi";
$.iv.image = "/appicon.png";

//var net = require('net');
var acs = require('acs');

function saveToDo() {

	if (!( typeof ($.iv.image) == "string")) {
		var filename = Ti.Filesystem.applicationDataDirectory + $.titoloTxt.value.replace(/ /g, "_") + "_" + new Date().getTime() + ".jpg";
		var f = Ti.Filesystem.getFile(filename);
		f.write($.iv.image.imageAsThumbnail(100, 0, 3));
	};
	var newToDo = Alloy.createModel("ToDo", {
		title : $.titoloTxt.value,
		location : $.locationTxt.value,
		alarm : $.alarmSw.value,
		duedate : $.dateBtn.title,
		path: filename
	});
	//Ti.API.info(newToDo.toJSON());
	if (newToDo.isValid()) {
		newToDo.save();
		//net.saveToDo(newToDo.attributes);
		acs.saveToDo(newToDo.attributes);
		Alloy.Collections.ToDo.add(newToDo);
		Alloy.Globals.tabgroup.setActiveTab(1);
	} else {
		alert("Inserire il titolo");
	}
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
	dueDateWindow.open();
}

function geolocateToDo() {
	var mapWin = Alloy.createController("MapWindow", {location: $.locationTxt.value, parent: $});
	mapWin.getView().open({modal:true});
}

function logout() {
	acs.logout();
	var loginWin = Alloy.createController("Login").getView();
	loginWin.open({modal:true});
}

