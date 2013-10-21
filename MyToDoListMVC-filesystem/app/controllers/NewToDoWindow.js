
var todo = Alloy.Models.ToDo;
$.alarmSw.value = false;
$.dateBtn.title = "oggi";
$.iv.image = "/appicon.png";

//var net = require('net');

function saveToDo() {
	var newToDo = Alloy.createModel("ToDo", {
		title: $.titoloTxt.value,
		location: $.locationTxt.value,
		alarm: $.alarmSw.value,
		duedate: $.dateBtn.title,
	});
	//Ti.API.info(newToDo.toJSON());
	if (newToDo.isValid()) {
		
		Ti.API.info(newToDo.toJSON());
		if ($.iv.image != "/appicon.png") {
			var filename = $.titoloTxt.value.replace(/ /g, "_") + '_' + new Date().getTime() + ".jpg";
			Ti.API.info(Ti.Filesystem.applicationDataDirectory + "/" + filename);
			
			var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
			f.write($.iv.image.imageAsThumbnail(60, 0, 5));
			newToDo.set('path', f.nativePath);
		}
		
		
		newToDo.save();
		Alloy.Collections.ToDo.add(newToDo);
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


function focusLocation() {
	Ti.API.info('titolo inserito');
	$.locationTxt.focus();
}

function blurKeyboard() {
	$.titoloTxt.blur();
	$.locationTxt.blur();
}

function openDueDateWindow() {
	var dueDateController = Alloy.createController("DueDateWindow", {parent: $});
	//dueDateController.setParent($);
	//dueDateController.setPickerDefaultDate($.dateBtn.title);
	var dueDateWindow = dueDateController.getView();
	dueDateWindow.open();
}

function chooseImg(e) {
	Ti.Media.openPhotoGallery({
		success: function(e) {
			$.iv.image = e.media;
		}
	});
}


