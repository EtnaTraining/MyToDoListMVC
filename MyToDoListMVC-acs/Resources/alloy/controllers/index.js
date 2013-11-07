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
    $.__views.__alloyId30 = Alloy.createController("NewToDoWindow", {
        id: "__alloyId30"
    });
    $.__views.__alloyId29 = Ti.UI.createTab({
        window: $.__views.__alloyId30.getViewEx({
            recurse: true
        }),
        title: "Nuova ToDo",
        icon: "KS_nav_views.png",
        id: "__alloyId29"
    });
    $.__views.tg.addTab($.__views.__alloyId29);
    $.__views.__alloyId34 = Alloy.createController("ListToDoWindow", {
        id: "__alloyId34"
    });
    $.__views.__alloyId33 = Ti.UI.createTab({
        window: $.__views.__alloyId34.getViewEx({
            recurse: true
        }),
        title: "Lista ToDo",
        icon: "KS_nav_ui.png",
        id: "__alloyId33"
    });
    $.__views.tg.addTab($.__views.__alloyId33);
    $.__views.tg && $.addTopLevelView($.__views.tg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tg.open();
    if (Ti.Network.online) {
        var loginWin = Alloy.createController("Login");
        loginWin.getView().open({
            modal: true
        });
    } else Alloy.Collections.ToDo.fetch();
    Alloy.Globals.tabgroup = $.tg;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;