bar = {
	height: 80,
	gap: 20,
	button: {
		width: 80
	},

	show: function() {
		$("#bar").show();
		bar.setValues();
		bar.initListeners();
	},

	hide: function() {
		$("#bar").hide();
		$("#main").css("top", 0);
	},

	showBackButton: function() {
		var button = $("#barLogo");
		button.attr("src", "../../resources/images/back-button.png");
		button.unbind();
		button.click(function() {
			view.pop();
		});
	},

	initListeners: function() {
		$("#barLogo").click(function() {
			
		});

		$("#searchInput").click(function() {
			if (!bar.isSearchPage()) {
				$("#searchInput").blur();
				view.push("search");
        	}
        });
	},

	isSearchPage: function() {
		if (window.location.href.indexOf("views/search/") !== -1)
			return true;
		else
			return false;
	},

	setValues: function() {
		$("#bar").css("height", bar.height);
		$("#main").css("top", bar.height + bar.gap);

		$("#logoArea").css("width", bar.button.width);
		$("#searchArea").css("left", bar.button.width);
		$("#searchArea").css("right", bar.button.width);
		$("#buttonArea").css("width", bar.button.width);
	}
}


