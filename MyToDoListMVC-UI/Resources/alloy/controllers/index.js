function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId5 = Alloy.createController("NewToDoWindow", {
        id: "__alloyId5"
    });
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.__alloyId5.getViewEx({
            recurse: true
        }),
        title: "Nuova ToDo",
        icon: "KS_nav_ui.png",
        id: "__alloyId4"
    });
    $.__views.index.addTab($.__views.__alloyId4);
    $.__views.__alloyId8 = Alloy.createController("ListTodoWindow", {
        id: "__alloyId8"
    });
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8.getViewEx({
            recurse: true
        }),
        title: "Lista ToDo",
        icon: "KS_nav_views.png",
        id: "__alloyId7"
    });
    $.__views.index.addTab($.__views.__alloyId7);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;