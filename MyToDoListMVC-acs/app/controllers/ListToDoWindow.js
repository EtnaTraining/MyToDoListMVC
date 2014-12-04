var todolist = Alloy.Collections.todo;
var acs = require('acs');
//todolist.fetch();
Ti.API.info(todolist.toJSON());

var todo = Alloy.Models.todo;

function editToDo(e) {
	var selToDo = todolist.at(e.index).attributes;
	Ti.API.info(selToDo);
	todo.set({
		title : selToDo.title,
		location : selToDo.location,
		alarm : selToDo.alarm,
		duedate : selToDo.duedate,
		image : selToDo.image ? Ti.Filesystem.applicationDataDirectory + selToDo.image : "/appicon.png"
	});
	Alloy.Globals.tabgroup.setActiveTab(0);
}

function defaultThumb(model) {
	//Ti.API.info("adding path");
	var todo = model.toJSON();
	if (todo.image) {
		todo.image = Ti.Filesystem.applicationDataDirectory + todo.image;
	} else {
		todo.image = "/appicon.png"
	}
	Ti.API.info("image: " + todo.image);
	return todo;
}

function reload() {
	if (Ti.Network.online) {
		acs.getToDos(function(todolist) {
			//Ti.API.info(todolist);
			Alloy.Collections.ToDo.reset(todolist);
		});
	}

}
