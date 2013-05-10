var todolist = Alloy.Collections.ToDo;
//todolist.fetch();

var net = require('net');
net.getToDos(function(todos) {
	for (var i=0; i<todos.length; i++) {
		var todo = Alloy.createModel("ToDo", todos[i]);
		todolist.add(todo);
	}
	Ti.API.info(todolist.toJSON());
});



var todo = Alloy.Models.ToDo;

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
