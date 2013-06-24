var current;
var variables;
var previous = {};

view = {
	push: function(name, params) {
		if(params != undefined) {
			variables = params;
		} else{
			variables = undefined;
		}
		
		$("#main").html(Handlebars.templates[name + ".html"]());
		previous = current;
		current = {'name': name, 'previous': previous};
		$("#main :last-child").ready(function() {
			$("#main").trigger('pageswitch');
		});

		
		// if (isSteroids()) {
		// 	var webView = createWebView(name, page);
		// 	steroids.layers.push(webView);
		// } else {
		// 	win.go(name, page);
		// }
	},

	pop: function() {
		if(previous['name'] == 'login' && isSteroids()) {
			navigator.device.exitApp();
		}

		current = previous;
		previous = current['previous'];

		$("#main").html(Handlebars.templates[current['name'] + ".html"]());
		$("#main :last-child").ready(function() {
			$("#main").trigger('pageswitch');
		});

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

function getCurrent() {
	return current;
}

function createWebView(name, page) {
	if (page == undefined)
		page = "index.html";

	return new steroids.views.WebView("views/"+name+"/"+page);
}

function getParameter(name) {
	if (variables==undefined){
		return undefined;
	}
	return variables[name] || undefined;
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
