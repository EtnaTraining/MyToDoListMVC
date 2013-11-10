function Controller() {
    function __alloyId9() {
        $.__views.ListToDoWindow.removeEventListener("open", __alloyId9);
        if ($.__views.ListToDoWindow.activity) $.__views.ListToDoWindow.activity.onCreateOptionsMenu = function(e) {
            var __alloyId8 = {
                id: "reload",
                title: "Reload"
            };
            $.__views.reload = e.menu.add(_.pick(__alloyId8, Alloy.Android.menuItemCreateArgs));
            $.__views.reload.applyProperties(_.omit(__alloyId8, Alloy.Android.menuItemCreateArgs));
            reload ? $.__views.reload.addEventListener("click", reload) : __defers["$.__views.reload!click!reload"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId14() {
        __alloyId14.opts || {};
        var models = __alloyId13.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = defaultThumb(__alloyId11);
            var __alloyId12 = Ti.UI.createTableViewRow({
                font: {
                    fontSize: "16dp"
                },
                color: "black",
                height: "60dp",
                leftImage: "undefined" != typeof __alloyId11.__transform["path"] ? __alloyId11.__transform["path"] : __alloyId11.get("path"),
                title: "undefined" != typeof __alloyId11.__transform["title"] ? __alloyId11.__transform["title"] : __alloyId11.get("title"),
                hasChild: "true"
            });
            rows.push(__alloyId12);
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
        id: "reload"
    });
    reload ? $.__views.reload.addEventListener("click", reload) : __defers["$.__views.reload!click!reload"] = true;
    $.__views.ListToDoWindow.rightNavButton = $.__views.reload;
    $.__views.ListToDoWindow.addEventListener("open", __alloyId9);
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