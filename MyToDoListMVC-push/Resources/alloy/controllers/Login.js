function Controller() {
    function __alloyId21() {
        $.__views.rootWin.removeEventListener("open", __alloyId21);
        if ($.__views.rootWin.activity) $.__views.rootWin.activity.onCreateOptionsMenu = function(e) {
            var __alloyId20 = {
                id: "cancel",
                title: "Offline"
            };
            $.__views.cancel = e.menu.add(_.pick(__alloyId20, Alloy.Android.menuItemCreateArgs));
            $.__views.cancel.applyProperties(_.omit(__alloyId20, Alloy.Android.menuItemCreateArgs));
            cancelLogin ? $.__views.cancel.addEventListener("click", cancelLogin) : __defers["$.__views.cancel!click!cancelLogin"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function userCreate() {
        acs.createUser($.username.value, $.password.value, function(e) {
            if (e.success) {
                acs.subscribeForPush();
                Alloy.Collections.ToDo.reset([]);
                $.rootWin.close();
            } else alert("Error during user creation: " + e.message);
        });
    }
    function login() {
        acs.loginUser($.username.value, $.password.value, function(e) {
            if (e.success) {
                acs.subscribeForPush();
                acs.getToDos(function(todolist) {
                    Alloy.Collections.ToDo.reset(todolist);
                    $.rootWin.close();
                });
            } else alert("Error during login: " + e.message);
        });
    }
    function cancelLogin() {
        Alloy.Collections.ToDo.fetch();
        $.rootWin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.rootWin = Ti.UI.createWindow({
        backgroundColor: "black",
        id: "rootWin",
        title: "Cloud Login"
    });
    $.__views.rootWin && $.addTopLevelView($.__views.rootWin);
    $.__views.rootWin.addEventListener("open", __alloyId21);
    $.__views.wrapper = Ti.UI.createView({
        backgroundColor: "white",
        borderRadius: 8,
        width: "300dp",
        height: "350dp",
        top: "20dp",
        layout: "vertical",
        id: "wrapper"
    });
    $.__views.rootWin.add($.__views.wrapper);
    $.__views.img = Ti.UI.createImageView({
        top: "10dp",
        width: "100dp",
        image: "/login.png",
        id: "img"
    });
    $.__views.wrapper.add($.__views.img);
    $.__views.username = Ti.UI.createTextField({
        backgroundColor: "#fff",
        left: "10dp",
        right: "10dp",
        height: "40dp",
        top: "10dp",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "username",
        hintText: "username"
    });
    $.__views.wrapper.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        backgroundColor: "#fff",
        left: "10dp",
        right: "10dp",
        height: "40dp",
        top: "10dp",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: true,
        autocorrection: false,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "password",
        hintText: "password"
    });
    $.__views.wrapper.add($.__views.password);
    $.__views.usercreate = Ti.UI.createButton({
        title: "Create Account",
        left: "10dp",
        right: "10dp",
        height: "40dp",
        top: "30dp",
        id: "usercreate"
    });
    $.__views.wrapper.add($.__views.usercreate);
    userCreate ? $.__views.usercreate.addEventListener("click", userCreate) : __defers["$.__views.usercreate!click!userCreate"] = true;
    $.__views.login = Ti.UI.createButton({
        title: "Login",
        left: "10dp",
        right: "10dp",
        height: "40dp",
        top: "10dp",
        id: "login"
    });
    $.__views.wrapper.add($.__views.login);
    login ? $.__views.login.addEventListener("click", login) : __defers["$.__views.login!click!login"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    __defers["$.__views.cancel!click!cancelLogin"] && $.__views.cancel.addEventListener("click", cancelLogin);
    __defers["$.__views.cancel!click!cancelLogin"] && $.__views.cancel.addEventListener("click", cancelLogin);
    __defers["$.__views.usercreate!click!userCreate"] && $.__views.usercreate.addEventListener("click", userCreate);
    __defers["$.__views.login!click!login"] && $.__views.login.addEventListener("click", login);
    __defers["$.__views.cancel!click!cancelLogin"] && $.__views.cancel.addEventListener("click", cancelLogin);
    __defers["$.__views.usercreate!click!userCreate"] && $.__views.usercreate.addEventListener("click", userCreate);
    __defers["$.__views.login!click!login"] && $.__views.login.addEventListener("click", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;