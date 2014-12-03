
var todo = Alloy.Models.todo;
$.alarmSw.value = false;
$.dateBtn.title = "oggi";
$.iv.image = "/appicon.png";

//var net = require('net');

function saveToDo() {
	var newToDo = Alloy.createModel("todo", {
		title: $.titoloTxt.value,
		location: $.locationTxt.value,
		alarm: $.alarmSw.value,
		duedate: $.dateBtn.title,
	});
	//Ti.API.info(newToDo.toJSON());
	if (newToDo.isValid()) {
		
		Ti.API.info(newToDo.toJSON());
		Ti.API.info("image path: " + $.iv.image );
		if (typeof($.iv.image) != "string") {
			var filename = $.titoloTxt.value.replace(/ /g, "_") + '_' + new Date().getTime() + ".jpg";
			Ti.API.info(Ti.Filesystem.applicationDataDirectory + "/" + filename);
			
			var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
			f.write($.iv.image.imageAsThumbnail(60, 0, 5));
			//newToDo.set('image', f.nativePath);
			newToDo.set('image', filename);
		} else {
			newToDo.set('image', $.iv.image);
		}
		
		Ti.API.info(newToDo.attributes);
		newToDo.save();
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


function focusLocation() {
	Ti.API.info('titolo inserito');
	$.locationTxt.focus();
}

function blurKeyboard() {
	$.titoloTxt.blur();
	$.locationTxt.blur();
}

function openDueDateWindow() {
	//var dueDateController = Alloy.createController("DueDateWindow", {parent: $});
	var dueDateController = Alloy.createController("DueDateWindow", $.dateBtn);
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


