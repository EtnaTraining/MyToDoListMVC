function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId18 = Alloy.createController("NewToDoWindow", {
        id: "__alloyId18"
    });
    $.__views.__alloyId17 = Ti.UI.createTab({
        window: $.__views.__alloyId18.getViewEx({
            recurse: true
        }),
        title: "Nuova ToDo",
        icon: "KS_nav_ui.png",
        id: "__alloyId17"
    });
    $.__views.index.addTab($.__views.__alloyId17);
    $.__views.__alloyId21 = Alloy.createController("ListToDoWindow", {
        id: "__alloyId21"
    });
    $.__views.__alloyId20 = Ti.UI.createTab({
        window: $.__views.__alloyId21.getViewEx({
            recurse: true
        }),
        title: "Lista ToDo",
        icon: "KS_nav_views.png",
        id: "__alloyId20"
    });
    $.__views.index.addTab($.__views.__alloyId20);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;