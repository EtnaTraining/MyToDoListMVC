function Controller() {
    function closeMapWin() {
        $.MapWindow.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.MapWindow = Ti.UI.createWindow({
        id: "MapWindow"
    });
    $.__views.MapWindow && $.addTopLevelView($.__views.MapWindow);
    var __alloyId21 = [];
    $.__views.todoPosition = Ti.Map.createAnnotation({
        id: "todoPosition"
    });
    __alloyId21.push($.__views.todoPosition);
    $.__views.todoMap = Ti.Map.createView({
        annotations: __alloyId21,
        ns: Ti.Map,
        id: "todoMap"
    });
    $.__views.MapWindow.add($.__views.todoMap);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.Geolocation.purpose = "Map your todos";
    Ti.API.info(JSON.stringify("Geo enabled" + Ti.Geolocation.locationServicesEnabled));
    if (Ti.Geolocation.locationServicesEnabled && "" == args.location) {
        Ti.API.info("geolocalizziamoci");
        Ti.Geolocation.getCurrentPosition(function(e) {
            Ti.API.info(JSON.stringify(e));
            $.todoMap.region = {
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            };
            $.todoPosition.latitude = e.coords.latitude;
            $.todoPosition.longitude = e.coords.longitude;
            $.todoPosition.title = args.parent.titoloTxt.value || "todo";
            $.todoMap.selectAnnotation($.todoPosition);
            Ti.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(e) {
                Ti.API.info(e.places[0].address);
                args.parent.locationTxt.value = e.places[0].address;
            });
        });
    } else {
        Ti.API.info("troviamo la posizione giusta");
        Ti.Geolocation.forwardGeocoder(args.location, function(e) {
            Ti.API.info(args.location);
            Ti.API.info(JSON.stringify(e));
            $.todoMap.region = {
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: .1,
                longitudeDelta: .1
            };
            $.todoPosition.latitude = e.latitude;
            $.todoPosition.longitude = e.longitude;
            $.todoPosition.title = args.parent.titoloTxt.value || "todo";
            $.todoMap.selectAnnotation($.todoPosition);
        });
    }
    __defers["$.__views.__alloyId20!click!closeMapWin"] && $.__views.__alloyId20.addEventListener("click", closeMapWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;