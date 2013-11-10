var args = arguments[0] || {};
//Ti.API.info(JSON.stringify(args));

Ti.Geolocation.purpose = "Map your todos";
Ti.API.info(JSON.stringify("Geo enabled: " + Ti.Geolocation.locationServicesEnabled));
if (Ti.Geolocation.locationServicesEnabled && args.location == "") {
    Ti.API.info("geolocalizziamoci")
    Ti.Geolocation.getCurrentPosition(function(e) {
        if (e.success) {
            Ti.API.info(JSON.stringify(e));
            $.todoMap.region = {
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            };
            //win.fireEvent('locationFound', e.coords)
            $.todoPosition.latitude = e.coords.latitude;
            $.todoPosition.longitude = e.coords.longitude;
            $.todoPosition.pinImage = "pin.png";
            $.todoPosition.title = args.parent.titoloTxt.value || "todo";
            $.todoMap.selectAnnotation($.todoPosition);
            Ti.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(e) {
                Ti.API.info(e.places[0].address);
                args.parent.locationTxt.value = e.places[0].address;
            });
        } else {
        	Ti.API.info("Error while getting the currentPosition");
        	Ti.API.info(JSON.stringify(e));
        }

    });
} else {
    Ti.API.info("troviamo la posizione giusta");
    Ti.Geolocation.forwardGeocoder(args.location, function(e) {
        if (e.success) {
            Ti.API.info(args.location);
            Ti.API.info(JSON.stringify(e));
            $.todoMap.region = {
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            };
            $.todoPosition.latitude = e.latitude;
            $.todoPosition.longitude = e.longitude;
            $.todoPosition.title = args.parent.titoloTxt.value || "todo";
            $.todoMap.selectAnnotation($.todoPosition);
            //$.todoPosition.set
        } else {
        	Ti.API.info("Error while using the geocoder");
        	Ti.API.info(JSON.stringify(e));
        }

    });
}

function closeMapWin() {
    if (OS_IOS) {
        $.navWin.close();
    } else {
        $.MapWindow.close();
    }

}