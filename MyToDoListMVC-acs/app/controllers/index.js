
$.tg.open();
if (Ti.Network.online) {
	var loginWinCtrl = Alloy.createController("Login");
	if (OS_IOS) {
		var navWin = Ti.UI.iOS.createNavigationWindow({
			modal: true,
			window: loginWinCtrl.getView()
		});
		loginWinCtrl.navWin = navWin;
		navWin.open();
	} else {
		loginWinCtrl.getView().open({modal:true});
	}
	
} else {
	Alloy.Collections.ToDo.fetch();
}



Alloy.Globals.tabgroup = $.tg;

