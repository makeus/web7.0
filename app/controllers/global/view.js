view = {
	push: function(name, page) {
		if (page == undefined)
			page = "index.html";
		win.go(name, page);
		// if (isSteroids()) {
		// 	var webView = createWebView(name, page);
		// 	steroids.layers.push(webView);
		// } else {
		// 	win.go(name, page);
		// }
	},

	pop: function() {
		win.back();
		// if (isSteroids())
		// 	steroids.layers.pop();
		// else
		// 	win.back();
	},

	preload: function(webView) {
		webView.preload({}, {
			onSuccess: function() {}
		});
	},

	pushPreloaded: function(webView) {
		steroids.layers.push(webView);
	}
}


modal = {
	show: function(name, page) {
		if (page == undefined)
			page = "index.html";

		if (isSteroids()) {
			var webView = createWebView(name, page);
			steroids.modal.show(webView);
		} else {
			win.go(name, page);
		}
	},

	hide: function() {
		if (isSteroids())
			steroids.modal.hide();
		else
			win.back();
	}
}


function createWebView(name, page) {
	if (page == undefined)
		page = "index.html";

	return new steroids.views.WebView("views/"+name+"/"+page);
}



// Do not use this
win = {
	go: function(name, page) {
		var path = "../"+name+"/"+page;
		window.location.href = path;
	},

	back: function() {
		window.history.go(-1);
	}
}
