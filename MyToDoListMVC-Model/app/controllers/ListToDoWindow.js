var todolist = Alloy.Collections.todo;
todolist.fetch();
Ti.API.info(todolist.toJSON());

var todo = Alloy.Models.todo;

function editToDo(e) {
	var selToDo = todolist.at(e.index).attributes;
	Ti.API.info(selToDo);
	todo.set({
		title: selToDo.title,
		location: selToDo.location,
		alarm: selToDo.alarm,
		duedate: selToDo.duedate
	});
	Alloy.Globals.tabgroup.setActiveTab(0);
}
