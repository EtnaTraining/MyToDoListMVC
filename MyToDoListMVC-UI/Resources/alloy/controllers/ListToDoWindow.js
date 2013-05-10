function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.ListToDoWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "List of ToDos",
        id: "ListToDoWindow"
    });
    $.__views.ListToDoWindow && $.addTopLevelView($.__views.ListToDoWindow);
    $.__views.__alloyId10 = Ti.UI.createTableViewRow({
        font: {
            fontSize: "14dp"
        },
        color: "black",
        height: "40dp",
        leftImage: "/appicon.png",
        title: "Titolo",
        hasChild: "true",
        id: "__alloyId10"
    });
    var __alloyId11 = [];
    __alloyId11.push($.__views.__alloyId10);
    $.__views.todoListTV = Ti.UI.createTableView({
        data: __alloyId11,
        id: "todoListTV",
        editable: "true"
    });
    $.__views.ListToDoWindow.add($.__views.todoListTV);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;