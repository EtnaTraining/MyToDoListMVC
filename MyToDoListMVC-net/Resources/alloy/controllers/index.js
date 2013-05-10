function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.tg = Ti.UI.createTabGroup({
        id: "tg"
    });
    $.__views.__alloyId4 = Alloy.createController("NewToDoWindow", {
        id: "__alloyId4"
    });
    $.__views.__alloyId3 = Ti.UI.createTab({
        window: $.__views.__alloyId4.getViewEx({
            recurse: true
        }),
        title: "Nuova ToDo",
        icon: "KS_nav_ui.png",
        id: "__alloyId3"
    });
    $.__views.tg.addTab($.__views.__alloyId3);
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
    $.__views.tg.addTab($.__views.__alloyId7);
    $.__views.tg && $.addTopLevelView($.__views.tg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tg.open();
    Alloy.Globals.tabgroup = $.tg;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;