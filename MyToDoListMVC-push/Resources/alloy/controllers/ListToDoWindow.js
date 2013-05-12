function Controller() {
    function __alloyId22() {
        var models = __alloyId21.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId19 = models[i];
            __alloyId19.__transform = defaultThumb(__alloyId19);
            var __alloyId20 = Ti.UI.createTableViewRow({
                leftImage: "undefined" != typeof __alloyId19.__transform["path"] ? __alloyId19.__transform["path"] : __alloyId19.get("path"),
                title: "undefined" != typeof __alloyId19.__transform["title"] ? __alloyId19.__transform["title"] : __alloyId19.get("title"),
                hasChild: "true"
            });
            rows.push(__alloyId20);
        }
        $.__views.todoListTV.setData(rows);
    }
    function editToDo(e) {
        var selToDo = todolist.at(e.index).attributes;
        todo.set({
            title: selToDo.title,
            location: selToDo.location,
            alarm: selToDo.alarm,
            duedate: selToDo.duedate,
            path: selToDo.path
        });
        Alloy.Globals.tabgroup.setActiveTab(0);
    }
    function defaultThumb(model) {
        model.get("path") || model.set("path", "/appicon.png");
        return model;
    }
    function reload() {
        Ti.Network.online && acs.getToDos(function(todolist) {
            Alloy.Collections.ToDo.reset(todolist);
        });
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
        title: "List of ToDo",
        id: "ListToDoWindow"
    });
    $.__views.ListToDoWindow && $.addTopLevelView($.__views.ListToDoWindow);
    $.__views.reload = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.REFRESH,
        id: "reload"
    });
    reload ? $.__views.reload.addEventListener("click", reload) : __defers["$.__views.reload!click!reload"] = true;
    $.__views.ListToDoWindow.rightNavButton = $.__views.reload;
    $.__views.todoListTV = Ti.UI.createTableView({
        id: "todoListTV",
        editable: "true"
    });
    $.__views.ListToDoWindow.add($.__views.todoListTV);
    var __alloyId21 = Alloy.Collections["ToDo"] || ToDo;
    __alloyId21.on("fetch destroy change add remove reset", __alloyId22);
    editToDo ? $.__views.todoListTV.addEventListener("click", editToDo) : __defers["$.__views.todoListTV!click!editToDo"] = true;
    exports.destroy = function() {
        __alloyId21.off("fetch destroy change add remove reset", __alloyId22);
    };
    _.extend($, $.__views);
    var todolist = Alloy.Collections.ToDo;
    var acs = require("acs");
    Ti.API.info(todolist.toJSON());
    var todo = Alloy.Models.ToDo;
    __defers["$.__views.reload!click!reload"] && $.__views.reload.addEventListener("click", reload);
    __defers["$.__views.reload!click!reload"] && $.__views.reload.addEventListener("click", reload);
    __defers["$.__views.todoListTV!click!editToDo"] && $.__views.todoListTV.addEventListener("click", editToDo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;