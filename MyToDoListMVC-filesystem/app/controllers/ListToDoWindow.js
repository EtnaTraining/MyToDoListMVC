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
		image: selToDo.image.indexOf("/appicon.png") == -1 ? Ti.Filesystem.applicationDataDirectory + selToDo.image : selToDo.image
	});
	Ti.API.info(todo.attributes);
	Alloy.Globals.tabgroup.setActiveTab(0);
}

function addImagePath(model) {
	
	var todo = model.toJSON();
	Ti.API.info(model.attributes);
	Ti.API.info(todo.image.indexOf("/appicon.png"));
	if (todo.image.indexOf("/appicon.png") == -1) {
		Ti.API.info("adding path to " + model.attributes.title);
		todo.image = Ti.Filesystem.applicationDataDirectory + todo.image;
	}
	
	return todo;
}