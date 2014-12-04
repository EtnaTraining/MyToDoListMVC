var todolist = Alloy.Collections.todo;


if (Ti.Network.online) {
    var net = require('net');
    net.getToDos(function(todos) {
        for (var i = 0; i < todos.length; i++) {
            var todo = Alloy.createModel("todo", todos[i]);
            todolist.add(todo);
        }
        Ti.API.info(JSON.stringify(todolist));
    });
} else {
    todolist.fetch();
}




var todo = Alloy.Models.todo;

function editToDo(e) {
    var selToDo = todolist.at(e.index).attributes;
    Ti.API.info(selToDo);
    var formattedDate = String.formatDate(new Date(selToDo.duedate), "medium");
    todo.set({
        title: selToDo.title,
        location: selToDo.location,
        alarm: selToDo.alarm,
        duedate: formattedDate
    });
    Alloy.Globals.tabgroup.setActiveTab(0);
}