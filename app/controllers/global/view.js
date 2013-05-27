function windowGo(name, page) {
	var path = "../"+name+"/"+page;
	window.location.href = path;
}


function windowBack() {
	window.history.go(-1);
}


function pushView(name, page) {
	if (page == undefined)
		page = "index.html";

	if (isSteroids()) {
		var webView = new steroids.views.WebView("views/"+name+"/"+page);
		steroids.layers.push(webView);
	} else {
		windowGo(name, page);
	}
}


function popView() {
	if (isSteroids()) {
		steroids.layers.pop();
	} else {
		windowBack();
	}
}


function showModal(name, page) {
	if (page == undefined)
		page = "index.html";

	if (isSteroids()) {
		var webView = new steroids.views.WebView("views/"+name+"/"+page);
		steroids.modal.show(webView);
	} else {
		windowGo(name, page);
	}
}


function hideModal() {
	if (isSteroids()) {
		steroids.modal.hide();
	} else {
		windowBack();
	}
}
