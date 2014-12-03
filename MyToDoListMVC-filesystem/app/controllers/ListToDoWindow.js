var todolist = Alloy.Collections.todo;
todolist.fetch();
Ti.API.info(todolist.toJSON());

var todo = Alloy.Models.todo;

function editToDo(e) {
	var selToDo = todolist.at(e.index).attributes;
	//Ti.API.info(selToDo);
	todo.set({
		title: selToDo.title,
		location: selToDo.location,
		alarm: selToDo.alarm,
		duedate: selToDo.duedate,
		image: Ti.Filesystem.applicationDataDirectory + selToDo.image
	});
	Ti.API.info(todo.attributes);
	Alloy.Globals.tabgroup.setActiveTab(0);
}

function addImagePath(model) {
	Ti.API.info("adding path");
	var todo = model.toJSON();
	todo.image = Ti.Filesystem.applicationDataDirectory + todo.image;
	//Ti.API.info(model.attributes);
	return todo;
}