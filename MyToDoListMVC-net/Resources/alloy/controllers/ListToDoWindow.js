function Controller() {
    function __alloyId17() {
        var models = __alloyId16.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId14 = models[i];
            __alloyId14.__transform = {};
            var __alloyId15 = Ti.UI.createTableViewRow({
                leftImage: "/appicon.png",
                title: "undefined" != typeof __alloyId14.__transform["title"] ? __alloyId14.__transform["title"] : __alloyId14.get("title"),
                hasChild: "true"
            });
            rows.push(__alloyId15);
        }
        $.__views.todoListTV.setData(rows);
    }
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("ToDo");
    $.__views.ListToDoWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "List of ToDos",
        id: "ListToDoWindow"
    });
    $.__views.ListToDoWindow && $.addTopLevelView($.__views.ListToDoWindow);
    $.__views.todoListTV = Ti.UI.createTableView({
        id: "todoListTV",
        editable: "true"
    });
    $.__views.ListToDoWindow.add($.__views.todoListTV);
    var __alloyId16 = Alloy.Collections["ToDo"] || ToDo;
    __alloyId16.on("fetch destroy change add remove reset", __alloyId17);
    editToDo ? $.__views.todoListTV.addEventListener("click", editToDo) : __defers["$.__views.todoListTV!click!editToDo"] = true;
    exports.destroy = function() {
        __alloyId16.off("fetch destroy change add remove reset", __alloyId17);
    };
    _.extend($, $.__views);
    var todolist = Alloy.Collections.ToDo;
    var net = require("net");
    net.getToDos(function(todos) {
        for (var i = 0; todos.length > i; i++) {
            var todo = Alloy.createModel("ToDo", todos[i]);
            todolist.add(todo);
        }
        Ti.API.info(todolist.toJSON());
    });
    var todo = Alloy.Models.ToDo;
    __defers["$.__views.todoListTV!click!editToDo"] && $.__views.todoListTV.addEventListener("click", editToDo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;