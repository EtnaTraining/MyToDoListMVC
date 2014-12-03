
var todo = Alloy.Models.todo;
$.alarmSw.value = false;
$.dateBtn.title = "oggi";

var net = require('net');

function saveToDo() {
	var newToDo = Alloy.createModel("todo", {
		title: $.titoloTxt.value,
		location: $.locationTxt.value,
		alarm: $.alarmSw.value,
		duedate: ($.dateBtn.title == "oggi") ? String.formatDate(new Date(), "medium") : $.dateBtn.title,
	});
	//Ti.API.info(newToDo.toJSON());
	if (newToDo.isValid()) {
		newToDo.save();
		if (Ti.Network.online) {
			net.saveToDo(newToDo.attributes);
		}
		Alloy.Collections.todo.add(newToDo);
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
	//var dueDateController = Alloy.createController("DueDateWindow", {parent: $});
	var dueDateController = Alloy.createController("DueDateWindow", $.dateBtn);
	//dueDateController.setParent($);
	//dueDateController.setPickerDefaultDate($.dateBtn.title);
	var dueDateWindow = dueDateController.getView();
	dueDateWindow.open();
}
