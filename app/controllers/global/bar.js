bar = {
	height: 80,
	gap: 20,

	show: function() {
		$("#bar").show();
		$("#bar").css("height", bar.height);
		$("#main").css("top", bar.height + bar.gap);

		bar.initListeners();
	},

	hide: function() {
		$("#bar").hide();
		$("#main").css("top", 0);
	},

	initListeners: function() {
		$("#barLogo").click(function() {
			
		});

		$("#searchInput").click(function() {
			if (!bar.isSearchPage()) {
				$("#searchInput").blur();
				pushView("search");
        	}
        });
	},

	isSearchPage: function() {
		if (window.location.href.indexOf("views/search/") !== -1)
			return true;
		else
			return false;
	}
}


