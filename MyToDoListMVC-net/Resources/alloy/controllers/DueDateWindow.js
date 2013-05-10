function Controller() {
    function closeWindow() {
        $.DueDateWindow.close();
    }
    function dataSelezionata(e) {
        parent.dateBtn.title = String.formatDate(e.value, "medium");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.DueDateWindow = Ti.UI.createWindow({
        modal: "true",
        backgroundColor: "white",
        title: "Seleziona scadenza",
        id: "DueDateWindow"
    });
    $.__views.DueDateWindow && $.addTopLevelView($.__views.DueDateWindow);
    $.__views.__alloyId1 = Ti.UI.createButton({
        title: "Close",
        id: "__alloyId1"
    });
    closeWindow ? $.__views.__alloyId1.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId1!click!closeWindow"] = true;
    $.__views.DueDateWindow.rightNavButton = $.__views.__alloyId1;
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        type: Ti.UI.PICKER_TYPE_DATE,
        top: "30"
    });
    $.__views.DueDateWindow.add($.__views.picker);
    dataSelezionata ? $.__views.picker.addEventListener("change", dataSelezionata) : __defers["$.__views.picker!change!dataSelezionata"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var parent = arguments[0].parent;
    __defers["$.__views.__alloyId1!click!closeWindow"] && $.__views.__alloyId1.addEventListener("click", closeWindow);
    __defers["$.__views.picker!change!dataSelezionata"] && $.__views.picker.addEventListener("change", dataSelezionata);
    __defers["$.__views.closeWindow!click!closeWindow"] && $.__views.closeWindow.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;