function Controller() {
    function closeWindow() {
        $.rootWin.close();
    }
    function dataSelezionata(e) {
        dateBtn.title = String.formatDate(e.value, "medium");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "DueDateWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.rootWin = Ti.UI.createWindow({
        id: "rootWin",
        modal: "true",
        backgroundColor: "white",
        title: "Seleziona scadenza"
    });
    $.__views.rootWin && $.addTopLevelView($.__views.rootWin);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        type: Ti.UI.PICKER_TYPE_DATE,
        top: "30"
    });
    $.__views.rootWin.add($.__views.picker);
    dataSelezionata ? $.__views.picker.addEventListener("change", dataSelezionata) : __defers["$.__views.picker!change!dataSelezionata"] = true;
    $.__views.closeWindow = Ti.UI.createButton({
        bottom: "40dp",
        title: "Chiudi",
        id: "closeWindow"
    });
    $.__views.rootWin.add($.__views.closeWindow);
    closeWindow ? $.__views.closeWindow.addEventListener("click", closeWindow) : __defers["$.__views.closeWindow!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dateBtn = arguments[0];
    __defers["$.__views.__alloyId1!click!closeWindow"] && $.__views.__alloyId1.addEventListener("click", closeWindow);
    __defers["$.__views.picker!change!dataSelezionata"] && $.__views.picker.addEventListener("change", dataSelezionata);
    __defers["$.__views.picker!change!dataSelezionata"] && $.__views.picker.addEventListener("change", dataSelezionata);
    __defers["$.__views.closeWindow!click!closeWindow"] && $.__views.closeWindow.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;