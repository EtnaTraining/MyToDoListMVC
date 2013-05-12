function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.tg = Ti.UI.createTabGroup({
        id: "tg"
    });
    $.__views.__alloyId6 = Alloy.createController("NewToDoWindow", {
        id: "__alloyId6"
    });
    $.__views.__alloyId5 = Ti.UI.createTab({
        window: $.__views.__alloyId6.getViewEx({
            recurse: true
        }),
        title: "Nuova ToDo",
        icon: "/KS_nav_views.png",
        id: "__alloyId5"
    });
    $.__views.tg.addTab($.__views.__alloyId5);
    $.__views.__alloyId10 = Alloy.createController("ListToDoWindow", {
        id: "__alloyId10"
    });
    $.__views.__alloyId9 = Ti.UI.createTab({
        window: $.__views.__alloyId10.getViewEx({
            recurse: true
        }),
        title: "Lista ToDo",
        icon: "/KS_nav_ui.png",
        id: "__alloyId9"
    });
    $.__views.tg.addTab($.__views.__alloyId9);
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