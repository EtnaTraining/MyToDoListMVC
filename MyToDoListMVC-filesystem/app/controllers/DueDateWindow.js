
//var parent = arguments[0].parent;
var dateBtn = arguments[0];

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
	dateBtn.title = String.formatDate(e.value, "medium");
	//parent.dateBtn.title = String.formatDate(e.value, "medium");
}

