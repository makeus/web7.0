var current;
var previous = {};

view = {
	push: function(name, params) {
		var variables;
		if(params != undefined) {
			variables = params;
		} else{
			variables = undefined;
		}
		
		$("#main").html(Handlebars.templates[name + ".html"]());
		previous = current;
		current = {'name': name, 'previous': previous, 'variables': variables};
		$("#main :last-child").ready(function() {
			$("#main").trigger('pageswitch');
		});
	},

	pop: function() {
		if((previous['name'] == 'login' && isSteroids()) || (current['name'] == 'login')) {
			return;
		}

		current = previous;
		previous = current['previous'];

		$("#main").html(Handlebars.templates[current['name'] + ".html"]());
		$("#main :last-child").ready(function() {
			$("#main").trigger('pageswitch');
		});
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


function getCurrent() {
	return current;
}

function getParameter(name) {
	if (current['variables']==undefined){
		return undefined;
	}
	return current['variables'][name] || undefined;
}