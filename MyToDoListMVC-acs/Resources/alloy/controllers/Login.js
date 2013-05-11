function Controller() {
    function userCreate() {
        acs.createUser($.username.value, $.password.value, function(e) {
            e.success ? $.logincontainer.close() : alert("Error during user creation: " + e.message);
        });
    }
    function login() {
        acs.loginUser($.username.value, $.password.value, function(e) {
            e.success ? acs.getToDos(function(todolist) {
                Alloy.Collections.ToDo.reset(todolist);
                $.logincontainer.close();
            }) : alert("Error during login: " + e.message);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.logincontainer = Ti.UI.createWindow({
        backgroundColor: "rgba(0,0,0,0.7)",
        id: "logincontainer",
        title: "Cloud Login"
    });
    $.__views.logincontainer && $.addTopLevelView($.__views.logincontainer);
    $.__views.wrapper = Ti.UI.createView({
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: "#000",
        borderWidth: 2,
        width: 300,
        height: 350,
        top: 20,
        layout: "vertical",
        id: "wrapper"
    });
    $.__views.logincontainer.add($.__views.wrapper);
    $.__views.img = Ti.UI.createImageView({
        top: 10,
        width: 100,
        image: "/images/login.png",
        id: "img"
    });
    $.__views.wrapper.add($.__views.img);
    $.__views.username = Ti.UI.createTextField({
        backgroundColor: "#fff",
        left: 10,
        right: 10,
        height: "40dp",
        top: 10,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "username",
        hintText: "username"
    });
    $.__views.wrapper.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        backgroundColor: "#fff",
        left: 10,
        right: 10,
        height: "40dp",
        top: 10,
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
        backgroundColor: "#fff",
        left: 10,
        right: 10,
        height: "40dp",
        top: 30,
        id: "usercreate"
    });
    $.__views.wrapper.add($.__views.usercreate);
    userCreate ? $.__views.usercreate.addEventListener("click", userCreate) : __defers["$.__views.usercreate!click!userCreate"] = true;
    $.__views.login = Ti.UI.createButton({
        title: "Login",
        backgroundColor: "#fff",
        left: 10,
        right: 10,
        height: "40dp",
        top: 10,
        id: "login"
    });
    $.__views.wrapper.add($.__views.login);
    login ? $.__views.login.addEventListener("click", login) : __defers["$.__views.login!click!login"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    __defers["$.__views.usercreate!click!userCreate"] && $.__views.usercreate.addEventListener("click", userCreate);
    __defers["$.__views.login!click!login"] && $.__views.login.addEventListener("click", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;