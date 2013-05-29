function preload(webView) {
	webView.preload({}, {
		onSuccess: function() {}
	});
}


function windowGo(name, page) {
	var path = "../"+name+"/"+page;
	window.location.href = path;
}


function windowBack() {
	window.history.go(-1);
}


function createWebView(name, page) {
	if (page == undefined)
		page = "index.html";

	return new steroids.views.WebView("views/"+name+"/"+page);
}


function pushView(name, page) {
	if (page == undefined)
		page = "index.html";

	if (isSteroids()) {
		var webView = createWebView(name, page);
		steroids.layers.push(webView);
	} else {
		windowGo(name, page);
	}
}

function pushPreloadedView(webView) {
	steroids.layers.push(webView);
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
		var webView = createWebView(name, page);
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
