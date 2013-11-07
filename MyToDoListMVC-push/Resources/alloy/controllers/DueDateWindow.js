function Controller() {
    function closeWindow() {
        $.rootWin.close();
    }
    function dataSelezionata(e) {
        parent.setDueDate(e.value);
    }
    function oraSelezionata(e) {
        Ti.API.info(JSON.stringify(e.value));
        parent.setDueTime(e.value);
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
        backgroundColor: "white",
        layout: "vertical",
        id: "rootWin",
        modal: "true",
        title: "Seleziona scadenza"
    });
    $.__views.rootWin && $.addTopLevelView($.__views.rootWin);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        type: Titanium.UI.PICKER_TYPE_DATE,
        top: "30dp"
    });
    $.__views.rootWin.add($.__views.picker);
    dataSelezionata ? $.__views.picker.addEventListener("change", dataSelezionata) : __defers["$.__views.picker!change!dataSelezionata"] = true;
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        type: Titanium.UI.PICKER_TYPE_TIME,
        top: "30dp"
    });
    $.__views.rootWin.add($.__views.picker);
    oraSelezionata ? $.__views.picker.addEventListener("change", oraSelezionata) : __defers["$.__views.picker!change!oraSelezionata"] = true;
    $.__views.closeWindow = Ti.UI.createButton({
        title: "Chiudi",
        id: "closeWindow",
        top: "30dp"
    });
    $.__views.rootWin.add($.__views.closeWindow);
    closeWindow ? $.__views.closeWindow.addEventListener("click", closeWindow) : __defers["$.__views.closeWindow!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var parent = arguments[0].parent;
    __defers["$.__views.__alloyId2!click!closeWindow"] && $.__views.__alloyId2.addEventListener("click", closeWindow);
    __defers["$.__views.picker!change!dataSelezionata"] && $.__views.picker.addEventListener("change", dataSelezionata);
    __defers["$.__views.picker!change!dataSelezionata"] && $.__views.picker.addEventListener("change", dataSelezionata);
    __defers["$.__views.picker!change!oraSelezionata"] && $.__views.picker.addEventListener("change", oraSelezionata);
    __defers["$.__views.closeWindow!click!closeWindow"] && $.__views.closeWindow.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;