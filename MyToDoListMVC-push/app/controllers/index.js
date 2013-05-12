
$.tg.open();
if (Ti.Network.online) {
	var loginWin = Alloy.createController("Login");
	loginWin.getView().open({modal:true});
} else {
	Alloy.Collections.ToDo.fetch();
}



Alloy.Globals.tabgroup = $.tg;

