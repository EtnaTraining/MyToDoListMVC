
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
	$.DueDateWindow.close();
}

function dataSelezionata(e) {
	parent.dateBtn.title = String.formatDate(e.value, "medium");
}

