
var parent = arguments[0].parent;


/* 
exports.setParent = function(p) {
	//Ti.API.info(JSON.stringify(p));
	parent = p;
}

exports.setPickerDefaultDate = function(date) {
	if (date != "oggi") {
		
		$.picker.value = day;
	} 
	
} */

function closeWindow() {
	$.rootWin.close();
}

function dataSelezionata(e) {
	parent.setDueDate(e.value);
	//parent.dateBtn.title = String.formatDate(e.value, "medium");
}

function oraSelezionata(e) {
	Ti.API.info(JSON.stringify(e.value));
	parent.setDueTime(e.value);
}

