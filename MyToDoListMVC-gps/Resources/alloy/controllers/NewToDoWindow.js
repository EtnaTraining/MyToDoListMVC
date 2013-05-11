function Controller() {
    function saveToDo() {
        if (!("string" == typeof $.iv.image)) {
            var filename = Ti.Filesystem.applicationDataDirectory + $.titoloTxt.value.replace(/ /g, "_") + "_" + new Date().getTime() + ".jpg";
            var f = Ti.Filesystem.getFile(filename);
            f.write($.iv.image.imageAsThumbnail(100, 0, 3));
        }
        var newToDo = Alloy.createModel("ToDo", {
            title: $.titoloTxt.value,
            location: $.locationTxt.value,
            alarm: $.alarmSw.value,
            duedate: $.dateBtn.title,
            path: filename
        });
        if (newToDo.isValid()) {
            newToDo.save();
            Alloy.Collections.ToDo.add(newToDo);
            Alloy.Globals.tabgroup.setActiveTab(1);
        } else alert("Inserire il titolo");
    }
    function chooseImg() {
        Ti.Media.openPhotoGallery({
            success: function(e) {
                $.iv.image = e.media;
            }
        });
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
        var dueDateController = Alloy.createController("DueDateWindow", {
            parent: $
        });
        var dueDateWindow = dueDateController.getView();
        dueDateWindow.open();
    }
    function geolocateToDo() {
        var mapWin = Alloy.createController("MapWindow", {
            location: $.locationTxt.value,
            parent: $
        });
        mapWin.getView().open({
            modal: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
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
    $.__views.__alloyId23 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId23"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Titolo",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.titoloTxt = Ti.UI.createTextField({
        height: "40dp",
        width: "65%",
        right: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        id: "titoloTxt",
        returnKeyType: Ti.UI.RETURNKEY_NEXT
    });
    $.__views.__alloyId23.add($.__views.titoloTxt);
    focusLocation ? $.__views.titoloTxt.addEventListener("return", focusLocation) : __defers["$.__views.titoloTxt!return!focusLocation"] = true;
    $.__views.__alloyId25 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId25"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId25);
    blurKeyboard ? $.__views.__alloyId25.addEventListener("click", blurKeyboard) : __defers["$.__views.__alloyId25!click!blurKeyboard"] = true;
    $.__views.__alloyId26 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Location",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.locationTxt = Ti.UI.createTextField({
        height: "40dp",
        width: "55%",
        right: "15%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        id: "locationTxt"
    });
    $.__views.__alloyId25.add($.__views.locationTxt);
    blurKeyboard ? $.__views.locationTxt.addEventListener("return", blurKeyboard) : __defers["$.__views.locationTxt!return!blurKeyboard"] = true;
    $.__views.mapButton = Ti.UI.createButton({
        right: "3%",
        width: "30dp",
        height: "30dp",
        backgroundImage: "/geolocate.png",
        id: "mapButton"
    });
    $.__views.__alloyId25.add($.__views.mapButton);
    geolocateToDo ? $.__views.mapButton.addEventListener("click", geolocateToDo) : __defers["$.__views.mapButton!click!geolocateToDo"] = true;
    $.__views.__alloyId27 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId27"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId27);
    blurKeyboard ? $.__views.__alloyId27.addEventListener("click", blurKeyboard) : __defers["$.__views.__alloyId27!click!blurKeyboard"] = true;
    $.__views.__alloyId28 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Allarme",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.alarmSw = Ti.UI.createSwitch({
        left: "30%",
        id: "alarmSw"
    });
    $.__views.__alloyId27.add($.__views.alarmSw);
    blurKeyboard ? $.__views.alarmSw.addEventListener("change", blurKeyboard) : __defers["$.__views.alarmSw!change!blurKeyboard"] = true;
    $.__views.__alloyId29 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId29"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        left: "5%",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        text: "Scadenza",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.dateBtn = Ti.UI.createButton({
        width: "65%",
        right: "5%",
        id: "dateBtn"
    });
    $.__views.__alloyId29.add($.__views.dateBtn);
    openDueDateWindow ? $.__views.dateBtn.addEventListener("click", openDueDateWindow) : __defers["$.__views.dateBtn!click!openDueDateWindow"] = true;
    $.__views.__alloyId31 = Ti.UI.createView({
        height: Ti.UI.FILL,
        id: "__alloyId31"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId31);
    $.__views.iv = Ti.UI.createImageView({
        left: "10%",
        width: "100dp",
        height: "100dp",
        id: "iv"
    });
    $.__views.__alloyId31.add($.__views.iv);
    chooseImg ? $.__views.iv.addEventListener("click", chooseImg) : __defers["$.__views.iv!click!chooseImg"] = true;
    $.__views.saveToDo = Ti.UI.createButton({
        top: "30dp",
        width: "130dp",
        height: "50dp",
        right: "5%",
        title: "Salva ToDo",
        id: "saveToDo"
    });
    $.__views.__alloyId31.add($.__views.saveToDo);
    saveToDo ? $.__views.saveToDo.addEventListener("click", saveToDo) : __defers["$.__views.saveToDo!click!saveToDo"] = true;
    var __alloyId32 = function() {
        $.titoloTxt.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["title"] : Alloy.Models.ToDo.get("title");
        $.locationTxt.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["location"] : Alloy.Models.ToDo.get("location");
        $.alarmSw.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["alarm"] : Alloy.Models.ToDo.get("alarm");
        $.dateBtn.title = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["duedate"] : Alloy.Models.ToDo.get("duedate");
        $.iv.image = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["path"] : Alloy.Models.ToDo.get("path");
    };
    Alloy.Models.ToDo.on("fetch change destroy", __alloyId32);
    exports.destroy = function() {
        Alloy.Models.ToDo.off("fetch change destroy", __alloyId32);
    };
    _.extend($, $.__views);
    Alloy.Models.ToDo;
    $.alarmSw.value = false;
    $.dateBtn.title = "oggi";
    $.iv.image = "/appicon.png";
    require("net");
    __defers["$.__views.titoloTxt!return!focusLocation"] && $.__views.titoloTxt.addEventListener("return", focusLocation);
    __defers["$.__views.__alloyId25!click!blurKeyboard"] && $.__views.__alloyId25.addEventListener("click", blurKeyboard);
    __defers["$.__views.locationTxt!return!blurKeyboard"] && $.__views.locationTxt.addEventListener("return", blurKeyboard);
    __defers["$.__views.mapButton!click!geolocateToDo"] && $.__views.mapButton.addEventListener("click", geolocateToDo);
    __defers["$.__views.__alloyId27!click!blurKeyboard"] && $.__views.__alloyId27.addEventListener("click", blurKeyboard);
    __defers["$.__views.alarmSw!change!blurKeyboard"] && $.__views.alarmSw.addEventListener("change", blurKeyboard);
    __defers["$.__views.dateBtn!click!openDueDateWindow"] && $.__views.dateBtn.addEventListener("click", openDueDateWindow);
    __defers["$.__views.iv!click!chooseImg"] && $.__views.iv.addEventListener("click", chooseImg);
    __defers["$.__views.saveToDo!click!saveToDo"] && $.__views.saveToDo.addEventListener("click", saveToDo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;