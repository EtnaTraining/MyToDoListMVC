
var todo = Alloy.Models.ToDo;
$.alarmSw.value = false;
$.dateBtn.title = "oggi";

var net = require('net');

function saveToDo() {
	var newToDo = Alloy.createModel("ToDo", {
		title: $.titoloTxt.value,
		location: $.locationTxt.value,
		alarm: $.alarmSw.value,
		duedate: $.dateBtn.title,
	});
	//Ti.API.info(newToDo.toJSON());
	if (newToDo.isValid()) {
		newToDo.save();
		net.saveToDo(newToDo.attributes);
		Alloy.Collections.ToDo.add(newToDo);
		Alloy.Globals.tabgroup.setActiveTab(1);
		// reset the form
        $.titoloTxt.value = "";
        $.locationTxt.value = "";
        $.alarmSw.value = false;
        $.dateBtn.title = "oggi";

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
