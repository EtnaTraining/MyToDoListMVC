function InvokeService(path, method, data, cb) {
    if ("function" == typeof data) {
        cb = data;
        data = null;
    }
    var xhr = Ti.Network.createHTTPClient();
    "function" == typeof cb && (xhr.onload = function(e) {
        var r = this.responseText;
        if (-1 != xhr.getResponseHeader("content-type").indexOf("json")) try {
            r = JSON.parse(r);
        } catch (E) {}
        cb(r, e);
    });
    "/" == exports.URL.match("/$") && 0 == path.indexOf("/") ? xhr.open(method, exports.URL + path.substring(1)) : xhr.open(method, exports.URL + path);
    xhr.send(data);
}

var url = Ti.App.Properties.getString("acs-service-baseurl-MyToDoListMVC-push");

exports.URL = url && url.replace(/^\s+|\s+$/g, "") ? url.replace(/^\s+|\s+$/g, "") : "http://localhost:8080";

exports.application_index = function(data, cb) {
    InvokeService("/", "GET", data, cb);
};

exports.application_broadcastPush = function(data, cb) {
    InvokeService("/push", "GET", data, cb);
};

exports.application_registerAlarm = function(data, cb) {
    InvokeService("/register", "POST", data, cb);
};