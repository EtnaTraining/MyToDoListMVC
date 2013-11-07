function Controller() {
    function __alloyId10() {
        $.__views.ListToDoWindow.removeEventListener("open", __alloyId10);
        if ($.__views.ListToDoWindow.activity) $.__views.ListToDoWindow.activity.onCreateOptionsMenu = function(e) {
            var __alloyId9 = {
                id: "reload",
                title: "Reload"
            };
            $.__views.reload = e.menu.add(_.pick(__alloyId9, Alloy.Android.menuItemCreateArgs));
            $.__views.reload.applyProperties(_.omit(__alloyId9, Alloy.Android.menuItemCreateArgs));
            reload ? $.__views.reload.addEventListener("click", reload) : __defers["$.__views.reload!click!reload"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId15() {
        __alloyId15.opts || {};
        var models = __alloyId14.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId12 = models[i];
            __alloyId12.__transform = defaultThumb(__alloyId12);
            var __alloyId13 = Ti.UI.createTableViewRow({
                font: {
                    fontSize: "16dp"
                },
                color: "black",
                height: "60dp",
                leftImage: "undefined" != typeof __alloyId12.__transform["path"] ? __alloyId12.__transform["path"] : __alloyId12.get("path"),
                title: "undefined" != typeof __alloyId12.__transform["title"] ? __alloyId12.__transform["title"] : __alloyId12.get("title"),
                hasChild: "true"
            });
            rows.push(__alloyId13);
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
    $.__views.ListToDoWindow.addEventListener("open", __alloyId10);
    $.__views.todoListTV = Ti.UI.createTableView({
        id: "todoListTV",
        editable: "true"
    });
    $.__views.ListToDoWindow.add($.__views.todoListTV);
    var __alloyId14 = Alloy.Collections["ToDo"] || ToDo;
    __alloyId14.on("fetch destroy change add remove reset", __alloyId15);
    editToDo ? $.__views.todoListTV.addEventListener("click", editToDo) : __defers["$.__views.todoListTV!click!editToDo"] = true;
    exports.destroy = function() {
        __alloyId14.off("fetch destroy change add remove reset", __alloyId15);
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