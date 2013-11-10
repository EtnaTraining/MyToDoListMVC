function Controller() {
    function saveToDo() {
        var newToDo = Alloy.createModel("ToDo", {
            title: $.titoloTxt.value,
            location: $.locationTxt.value,
            alarm: $.alarmSw.value,
            duedate: $.dateBtn.title
        });
        if (newToDo.isValid()) {
            newToDo.save();
            Alloy.Collections.ToDo.add(newToDo);
            Alloy.Globals.tabgroup.setActiveTab(1);
            $.titoloTxt.value = "";
            $.locationTxt.value = "";
            $.alarmSw.value = false;
            $.dateBtn.title = "oggi";
        } else alert("Inserire il titolo");
    }
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
    Alloy.Models.instance("ToDo");
    $.__views.NewToDoWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "New ToDo Window",
        layout: "vertical",
        id: "NewToDoWindow"
    });
    $.__views.NewToDoWindow && $.addTopLevelView($.__views.NewToDoWindow);
    $.__views.__alloyId14 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId14"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Titolo",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.titoloTxt = Ti.UI.createTextField({
        height: "40dp",
        width: "65%",
        right: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "titoloTxt",
        returnKeyType: Ti.UI.RETURNKEY_NEXT
    });
    $.__views.__alloyId14.add($.__views.titoloTxt);
    focusLocation ? $.__views.titoloTxt.addEventListener("return", focusLocation) : __defers["$.__views.titoloTxt!return!focusLocation"] = true;
    $.__views.__alloyId16 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId16"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId16);
    blurKeyboard ? $.__views.__alloyId16.addEventListener("click", blurKeyboard) : __defers["$.__views.__alloyId16!click!blurKeyboard"] = true;
    $.__views.__alloyId17 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Location",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.locationTxt = Ti.UI.createTextField({
        height: "40dp",
        width: "65%",
        right: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "locationTxt"
    });
    $.__views.__alloyId16.add($.__views.locationTxt);
    blurKeyboard ? $.__views.locationTxt.addEventListener("return", blurKeyboard) : __defers["$.__views.locationTxt!return!blurKeyboard"] = true;
    $.__views.__alloyId18 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId18"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId18);
    blurKeyboard ? $.__views.__alloyId18.addEventListener("click", blurKeyboard) : __defers["$.__views.__alloyId18!click!blurKeyboard"] = true;
    $.__views.__alloyId19 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Allarme",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.alarmSw = Ti.UI.createSwitch({
        left: "30%",
        id: "alarmSw"
    });
    $.__views.__alloyId18.add($.__views.alarmSw);
    blurKeyboard ? $.__views.alarmSw.addEventListener("change", blurKeyboard) : __defers["$.__views.alarmSw!change!blurKeyboard"] = true;
    $.__views.__alloyId20 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId20"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Scadenza",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.dateBtn = Ti.UI.createButton({
        width: "65%",
        right: "5%",
        id: "dateBtn"
    });
    $.__views.__alloyId20.add($.__views.dateBtn);
    openDueDateWindow ? $.__views.dateBtn.addEventListener("click", openDueDateWindow) : __defers["$.__views.dateBtn!click!openDueDateWindow"] = true;
    $.__views.__alloyId22 = Ti.UI.createView({
        height: Ti.UI.FILL,
        id: "__alloyId22"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId22);
    $.__views.iv = Ti.UI.createImageView({
        left: "10%",
        width: "100dp",
        height: "100dp",
        id: "iv",
        image: "/appicon.png"
    });
    $.__views.__alloyId22.add($.__views.iv);
    $.__views.saveToDo = Ti.UI.createButton({
        top: "30dp",
        width: "130dp",
        height: "50dp",
        right: "5%",
        title: "Salva ToDo",
        id: "saveToDo"
    });
    $.__views.__alloyId22.add($.__views.saveToDo);
    saveToDo ? $.__views.saveToDo.addEventListener("click", saveToDo) : __defers["$.__views.saveToDo!click!saveToDo"] = true;
    var __alloyId23 = function() {
        $.titoloTxt.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["title"] : Alloy.Models.ToDo.get("title");
        $.titoloTxt.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["title"] : Alloy.Models.ToDo.get("title");
        $.locationTxt.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["location"] : Alloy.Models.ToDo.get("location");
        $.locationTxt.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["location"] : Alloy.Models.ToDo.get("location");
        $.alarmSw.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["alarm"] : Alloy.Models.ToDo.get("alarm");
        $.alarmSw.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["alarm"] : Alloy.Models.ToDo.get("alarm");
        $.dateBtn.title = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["duedate"] : Alloy.Models.ToDo.get("duedate");
        $.dateBtn.title = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["duedate"] : Alloy.Models.ToDo.get("duedate");
    };
    Alloy.Models.ToDo.on("fetch change destroy", __alloyId23);
    exports.destroy = function() {
        Alloy.Models.ToDo.off("fetch change destroy", __alloyId23);
    };
    _.extend($, $.__views);
    Alloy.Models.ToDo;
    $.alarmSw.value = false;
    $.dateBtn.title = "oggi";
    __defers["$.__views.titoloTxt!return!focusLocation"] && $.__views.titoloTxt.addEventListener("return", focusLocation);
    __defers["$.__views.__alloyId16!click!blurKeyboard"] && $.__views.__alloyId16.addEventListener("click", blurKeyboard);
    __defers["$.__views.locationTxt!return!blurKeyboard"] && $.__views.locationTxt.addEventListener("return", blurKeyboard);
    __defers["$.__views.__alloyId18!click!blurKeyboard"] && $.__views.__alloyId18.addEventListener("click", blurKeyboard);
    __defers["$.__views.alarmSw!change!blurKeyboard"] && $.__views.alarmSw.addEventListener("change", blurKeyboard);
    __defers["$.__views.dateBtn!click!openDueDateWindow"] && $.__views.dateBtn.addEventListener("click", openDueDateWindow);
    __defers["$.__views.saveToDo!click!saveToDo"] && $.__views.saveToDo.addEventListener("click", saveToDo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;