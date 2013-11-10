function Controller() {
    function focusLocation() {
        Ti.API.info("titolo inserito");
        $.locationTxt.focus();
    }
    function blurKeyboard() {
        $.titoloTxt.blur();
        $.locationTxt.blur();
    }
    function openDueDateWindow() {
        var dueDateController = Alloy.createController("DueDateWindow", $.dateBtn);
        var dueDateWindow = dueDateController.getView();
        dueDateWindow.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "NewToDoWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.NewToDoWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "New ToDo Window",
        layout: "vertical",
        id: "NewToDoWindow"
    });
    $.__views.NewToDoWindow && $.addTopLevelView($.__views.NewToDoWindow);
    $.__views.__alloyId7 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId7"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Titolo",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.titoloTxt = Ti.UI.createTextField({
        height: "40dp",
        width: "65%",
        right: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "titoloTxt",
        returnKeyType: Ti.UI.RETURNKEY_NEXT
    });
    $.__views.__alloyId7.add($.__views.titoloTxt);
    focusLocation ? $.__views.titoloTxt.addEventListener("return", focusLocation) : __defers["$.__views.titoloTxt!return!focusLocation"] = true;
    $.__views.__alloyId9 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId9"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId9);
    blurKeyboard ? $.__views.__alloyId9.addEventListener("click", blurKeyboard) : __defers["$.__views.__alloyId9!click!blurKeyboard"] = true;
    $.__views.__alloyId10 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Location",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.locationTxt = Ti.UI.createTextField({
        height: "40dp",
        width: "65%",
        right: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "locationTxt"
    });
    $.__views.__alloyId9.add($.__views.locationTxt);
    blurKeyboard ? $.__views.locationTxt.addEventListener("return", blurKeyboard) : __defers["$.__views.locationTxt!return!blurKeyboard"] = true;
    $.__views.__alloyId11 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId11"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId11);
    blurKeyboard ? $.__views.__alloyId11.addEventListener("click", blurKeyboard) : __defers["$.__views.__alloyId11!click!blurKeyboard"] = true;
    $.__views.__alloyId12 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Allarme",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.alarmSw = Ti.UI.createSwitch({
        left: "30%",
        id: "alarmSw",
        value: "false"
    });
    $.__views.__alloyId11.add($.__views.alarmSw);
    blurKeyboard ? $.__views.alarmSw.addEventListener("change", blurKeyboard) : __defers["$.__views.alarmSw!change!blurKeyboard"] = true;
    $.__views.__alloyId13 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId13"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Scadenza",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.dateBtn = Ti.UI.createButton({
        width: "65%",
        right: "5%",
        id: "dateBtn",
        title: "oggi"
    });
    $.__views.__alloyId13.add($.__views.dateBtn);
    openDueDateWindow ? $.__views.dateBtn.addEventListener("click", openDueDateWindow) : __defers["$.__views.dateBtn!click!openDueDateWindow"] = true;
    $.__views.__alloyId15 = Ti.UI.createView({
        height: Ti.UI.FILL,
        id: "__alloyId15"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId15);
    $.__views.iv = Ti.UI.createImageView({
        left: "10%",
        width: "100dp",
        height: "100dp",
        id: "iv",
        image: "/appicon.png"
    });
    $.__views.__alloyId15.add($.__views.iv);
    $.__views.saveToDo = Ti.UI.createButton({
        top: "30dp",
        width: "130dp",
        height: "50dp",
        right: "5%",
        title: "Salva ToDo",
        id: "saveToDo"
    });
    $.__views.__alloyId15.add($.__views.saveToDo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.titoloTxt!return!focusLocation"] && $.__views.titoloTxt.addEventListener("return", focusLocation);
    __defers["$.__views.__alloyId9!click!blurKeyboard"] && $.__views.__alloyId9.addEventListener("click", blurKeyboard);
    __defers["$.__views.locationTxt!return!blurKeyboard"] && $.__views.locationTxt.addEventListener("return", blurKeyboard);
    __defers["$.__views.__alloyId11!click!blurKeyboard"] && $.__views.__alloyId11.addEventListener("click", blurKeyboard);
    __defers["$.__views.alarmSw!change!blurKeyboard"] && $.__views.alarmSw.addEventListener("change", blurKeyboard);
    __defers["$.__views.dateBtn!click!openDueDateWindow"] && $.__views.dateBtn.addEventListener("click", openDueDateWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;