function Controller() {
    function __alloyId14() {
        __alloyId14.opts || {};
        var models = __alloyId13.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId7 = models[i];
            __alloyId7.__transform = {};
            var __alloyId8 = Ti.UI.createTableViewRow({
                height: "70dp",
                hasChild: "true"
            });
            rows.push(__alloyId8);
            var __alloyId10 = Ti.UI.createImageView({
                left: "5dp",
                width: "60dp",
                height: "60dp",
                image: "undefined" != typeof __alloyId7.__transform["path"] ? __alloyId7.__transform["path"] : __alloyId7.get("path")
            });
            __alloyId8.add(__alloyId10);
            var __alloyId12 = Ti.UI.createLabel({
                left: "80dp",
                font: {
                    fontSize: "18dp"
                },
                color: "black",
                text: "undefined" != typeof __alloyId7.__transform["title"] ? __alloyId7.__transform["title"] : __alloyId7.get("title")
            });
            __alloyId8.add(__alloyId12);
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
            duedate: selToDo.duedate,
            path: selToDo.path
        });
        Alloy.Globals.tabgroup.setActiveTab(0);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ListToDoWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
    var __alloyId13 = Alloy.Collections["ToDo"] || ToDo;
    __alloyId13.on("fetch destroy change add remove reset", __alloyId14);
    editToDo ? $.__views.todoListTV.addEventListener("click", editToDo) : __defers["$.__views.todoListTV!click!editToDo"] = true;
    exports.destroy = function() {
        __alloyId13.off("fetch destroy change add remove reset", __alloyId14);
    };
    _.extend($, $.__views);
    var todolist = Alloy.Collections.ToDo;
    todolist.fetch();
    Ti.API.info(todolist.toJSON());
    var todo = Alloy.Models.ToDo;
    __defers["$.__views.todoListTV!click!editToDo"] && $.__views.todoListTV.addEventListener("click", editToDo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;