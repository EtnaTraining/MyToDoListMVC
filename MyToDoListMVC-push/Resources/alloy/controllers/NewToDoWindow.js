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
            duedate: dueDate,
            path: filename
        });
        if (newToDo.isValid()) {
            newToDo.save();
            acs.saveToDo(newToDo.attributes);
            $.alarmSw.value && acs.registerAlarm(newToDo.attributes);
            Alloy.Collections.ToDo.add(newToDo);
            Alloy.Globals.tabgroup.setActiveTab(1);
        } else alert("Inserire il titolo");
    }
    function showToDo(e) {
        var todo;
        var todo = e.data.todo;
        $.titoloTxt.value = todo.title;
        $.locationTxt.value = todo.location;
        $.alarmSw.value = todo.alarm;
        $.dateBtn.title = todo.duedate;
        $.iv.image = todo.path;
        Alloy.Globals.tabgroup.setActiveTab(0);
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
    function logout() {
        if (Ti.Network.online) {
            acs.unsubscribeForPush();
            acs.logout();
            var loginWin = Alloy.createController("Login").getView();
            loginWin.open({
                modal: true
            });
        }
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
    $.__views.logout = Ti.UI.createButton({
        id: "logout",
        title: "Cloud"
    });
    logout ? $.__views.logout.addEventListener("click", logout) : __defers["$.__views.logout!click!logout"] = true;
    $.__views.NewToDoWindow.leftNavButton = $.__views.logout;
    $.__views.__alloyId34 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId34"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        left: "5%",
        text: "Titolo",
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    $.__views.titoloTxt = Ti.UI.createTextField({
        height: "40dp",
        width: "65%",
        right: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        color: "black",
        id: "titoloTxt",
        returnKeyType: Ti.UI.RETURNKEY_NEXT
    });
    $.__views.__alloyId34.add($.__views.titoloTxt);
    focusLocation ? $.__views.titoloTxt.addEventListener("return", focusLocation) : __defers["$.__views.titoloTxt!return!focusLocation"] = true;
    $.__views.__alloyId36 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId36"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId36);
    blurKeyboard ? $.__views.__alloyId36.addEventListener("click", blurKeyboard) : __defers["$.__views.__alloyId36!click!blurKeyboard"] = true;
    $.__views.__alloyId37 = Ti.UI.createLabel({
        left: "5%",
        text: "Location",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.locationTxt = Ti.UI.createTextField({
        height: "40dp",
        width: "55%",
        right: "15%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        color: "black",
        id: "locationTxt"
    });
    $.__views.__alloyId36.add($.__views.locationTxt);
    blurKeyboard ? $.__views.locationTxt.addEventListener("return", blurKeyboard) : __defers["$.__views.locationTxt!return!blurKeyboard"] = true;
    $.__views.mapButton = Ti.UI.createButton({
        right: "3%",
        width: "30dp",
        height: "30dp",
        backgroundImage: "/geolocate.png",
        id: "mapButton"
    });
    $.__views.__alloyId36.add($.__views.mapButton);
    geolocateToDo ? $.__views.mapButton.addEventListener("click", geolocateToDo) : __defers["$.__views.mapButton!click!geolocateToDo"] = true;
    $.__views.__alloyId38 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId38"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId38);
    blurKeyboard ? $.__views.__alloyId38.addEventListener("click", blurKeyboard) : __defers["$.__views.__alloyId38!click!blurKeyboard"] = true;
    $.__views.__alloyId39 = Ti.UI.createLabel({
        left: "5%",
        text: "Allarme",
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    $.__views.alarmSw = Ti.UI.createSwitch({
        left: "30%",
        id: "alarmSw"
    });
    $.__views.__alloyId38.add($.__views.alarmSw);
    blurKeyboard ? $.__views.alarmSw.addEventListener("change", blurKeyboard) : __defers["$.__views.alarmSw!change!blurKeyboard"] = true;
    $.__views.__alloyId40 = Ti.UI.createView({
        height: "60dp",
        id: "__alloyId40"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        left: "5%",
        text: "Scadenza",
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    $.__views.dateBtn = Ti.UI.createButton({
        width: "65%",
        right: "5%",
        id: "dateBtn",
        title: "oggi"
    });
    $.__views.__alloyId40.add($.__views.dateBtn);
    openDueDateWindow ? $.__views.dateBtn.addEventListener("click", openDueDateWindow) : __defers["$.__views.dateBtn!click!openDueDateWindow"] = true;
    $.__views.__alloyId42 = Ti.UI.createView({
        height: Ti.UI.FILL,
        id: "__alloyId42"
    });
    $.__views.NewToDoWindow.add($.__views.__alloyId42);
    $.__views.iv = Ti.UI.createImageView({
        left: "10%",
        width: "100dp",
        height: "100dp",
        id: "iv"
    });
    $.__views.__alloyId42.add($.__views.iv);
    chooseImg ? $.__views.iv.addEventListener("click", chooseImg) : __defers["$.__views.iv!click!chooseImg"] = true;
    $.__views.saveToDo = Ti.UI.createButton({
        top: "30dp",
        width: "130dp",
        height: "50dp",
        right: "5%",
        title: "Salva ToDo",
        id: "saveToDo"
    });
    $.__views.__alloyId42.add($.__views.saveToDo);
    saveToDo ? $.__views.saveToDo.addEventListener("click", saveToDo) : __defers["$.__views.saveToDo!click!saveToDo"] = true;
    var __alloyId43 = function() {
        $.titoloTxt.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["title"] : Alloy.Models.ToDo.get("title");
        $.locationTxt.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["location"] : Alloy.Models.ToDo.get("location");
        $.alarmSw.value = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["alarm"] : Alloy.Models.ToDo.get("alarm");
        $.iv.image = _.isFunction(Alloy.Models.ToDo.transform) ? Alloy.Models.ToDo.transform()["path"] : Alloy.Models.ToDo.get("path");
    };
    Alloy.Models.ToDo.on("fetch change destroy", __alloyId43);
    exports.destroy = function() {
        Alloy.Models.ToDo.off("fetch change destroy", __alloyId43);
    };
    _.extend($, $.__views);
    var todo = Alloy.Models.ToDo;
    $.alarmSw.value = false;
    $.dateBtn.title = "oggi";
    $.iv.image = "/appicon.png";
    var net = require("net");
    net.enablePushNotifications(showToDo);
    var acs = require("acs");
    var dueDate = new Date();
    todo.on("change:duedate", function(e) {
        Ti.API.info(e.attributes.duedate);
        $.dateBtn.title = String.formatDate(e.attributes.duedate, "medium");
    });
    exports.setDueDate = function(date) {
        dueDate = date;
        Ti.API.info(dueDate);
    };
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    __defers["$.__views.titoloTxt!return!focusLocation"] && $.__views.titoloTxt.addEventListener("return", focusLocation);
    __defers["$.__views.__alloyId36!click!blurKeyboard"] && $.__views.__alloyId36.addEventListener("click", blurKeyboard);
    __defers["$.__views.locationTxt!return!blurKeyboard"] && $.__views.locationTxt.addEventListener("return", blurKeyboard);
    __defers["$.__views.mapButton!click!geolocateToDo"] && $.__views.mapButton.addEventListener("click", geolocateToDo);
    __defers["$.__views.__alloyId38!click!blurKeyboard"] && $.__views.__alloyId38.addEventListener("click", blurKeyboard);
    __defers["$.__views.alarmSw!change!blurKeyboard"] && $.__views.alarmSw.addEventListener("change", blurKeyboard);
    __defers["$.__views.dateBtn!click!openDueDateWindow"] && $.__views.dateBtn.addEventListener("click", openDueDateWindow);
    __defers["$.__views.iv!click!chooseImg"] && $.__views.iv.addEventListener("click", chooseImg);
    __defers["$.__views.saveToDo!click!saveToDo"] && $.__views.saveToDo.addEventListener("click", saveToDo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;