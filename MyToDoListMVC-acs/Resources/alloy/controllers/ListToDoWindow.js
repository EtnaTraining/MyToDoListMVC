function Controller() {
    function __alloyId11() {
        __alloyId11.opts || {};
        var models = __alloyId10.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId8 = models[i];
            __alloyId8.__transform = defaultThumb(__alloyId8);
            var __alloyId9 = Ti.UI.createTableViewRow({
                leftImage: "undefined" != typeof __alloyId8.__transform["path"] ? __alloyId8.__transform["path"] : __alloyId8.get("path"),
                title: "undefined" != typeof __alloyId8.__transform["title"] ? __alloyId8.__transform["title"] : __alloyId8.get("title"),
                hasChild: "true"
            });
            rows.push(__alloyId9);
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
    var __alloyId10 = Alloy.Collections["ToDo"] || ToDo;
    __alloyId10.on("fetch destroy change add remove reset", __alloyId11);
    editToDo ? $.__views.todoListTV.addEventListener("click", editToDo) : __defers["$.__views.todoListTV!click!editToDo"] = true;
    exports.destroy = function() {
        __alloyId10.off("fetch destroy change add remove reset", __alloyId11);
    };
    _.extend($, $.__views);
    var todolist = Alloy.Collections.ToDo;
    var acs = require("acs");
    Ti.API.info(todolist.toJSON());
    var todo = Alloy.Models.ToDo;
    __defers["$.__views.reload!click!reload"] && $.__views.reload.addEventListener("click", reload);
    __defers["$.__views.todoListTV!click!editToDo"] && $.__views.todoListTV.addEventListener("click", editToDo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;