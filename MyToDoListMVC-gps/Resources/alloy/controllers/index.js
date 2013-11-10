function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tg = Ti.UI.createTabGroup({
        id: "tg"
    });
    $.__views.__alloyId28 = Alloy.createController("NewToDoWindow", {
        id: "__alloyId28"
    });
    $.__views.__alloyId27 = Ti.UI.createTab({
        window: $.__views.__alloyId28.getViewEx({
            recurse: true
        }),
        title: "Nuova ToDo",
        icon: "KS_nav_ui.png",
        id: "__alloyId27"
    });
    $.__views.tg.addTab($.__views.__alloyId27);
    $.__views.__alloyId32 = Alloy.createController("ListToDoWindow", {
        id: "__alloyId32"
    });
    $.__views.__alloyId31 = Ti.UI.createTab({
        window: $.__views.__alloyId32.getViewEx({
            recurse: true
        }),
        title: "Lista ToDo",
        icon: "KS_nav_views.png",
        id: "__alloyId31"
    });
    $.__views.tg.addTab($.__views.__alloyId31);
    $.__views.tg && $.addTopLevelView($.__views.tg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tg.open();
    Alloy.Globals.tabgroup = $.tg;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;