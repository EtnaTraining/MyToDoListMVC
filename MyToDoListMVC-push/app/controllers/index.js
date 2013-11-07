$.tg.open();
if (Ti.Network.online) {
	var loginWin = Alloy.createController("Login");
	/*if (OS_IOS) {
		Ti.UI.iOS.createNavigationWindow({
			modal : true,
			window : loginWin.getView()
		}).open();
	} else { */
		loginWin.getView().open({
			modal : true
		});
	/* } */

} else {
	Alloy.Collections.ToDo.fetch();
}

Alloy.Globals.tabgroup = $.tg;

