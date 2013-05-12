var todolist = Alloy.Collections.ToDo;
var acs = require('acs');
//todolist.fetch();
Ti.API.info(todolist.toJSON());

var todo = Alloy.Models.ToDo;

function editToDo(e) {
	var selToDo = todolist.at(e.index).attributes;
	Ti.API.info(selToDo);
	todo.set({
		title : selToDo.title,
		location : selToDo.location,
		alarm : selToDo.alarm,
		duedate : selToDo.duedate,
		path : selToDo.path
	});
	Alloy.Globals.tabgroup.setActiveTab(0);
}

function defaultThumb(model) {
	if (!model.get("path")) {
		model.set("path", "/appicon.png");
	}
	return model;
}

function reload() {
	if (Ti.Network.online) {
		acs.getToDos(function(todolist) {
			//Ti.API.info(todolist);
			Alloy.Collections.ToDo.reset(todolist);
		});
	}

}
