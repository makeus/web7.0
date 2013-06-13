bar = {
	height: 80,
	gap: 20,
	button: {
		width: 80
	},

	show: function() {
		$("#bar").show();
		//bar.setValues();
		bar.initListeners();
	},

	hide: function() {
		$("#bar").hide();
		$("#main").css("top", 0);
	},

	showBackButton: function() {
		$("#backButton").css("visibility", "visible");
		var button = $("#barLogo");
		//button.attr("src", "../../resources/images/back-button.png");
		//button.css("margin-top", 0);
		//button.css("height", 80);
		//button.css("max-height", 80);

		button.unbind();
		button.click(function() {
			view.pop();
		});
	},

	initListeners: function() {
		$("#ownPictureButton").attr("src",getImage());
		$("#ownPictureButton").click(function(){
			view.push("frontpage");
		});
		$("#backButton").click(function(){
			view.pop();
		});
		if (bar.isSearchPage()){
			$("#searchArea").show();
			$("#rightBarArea").hide();
			$("#nameAndRoleBar").hide();
		}
		$("#barLogo").click(function() {
			$( "#leftpanel" ).panel( "open" );
		});
		$("#relationsButton").click(function(){
			$( "#rightpanel" ).panel( "open" );

		})
		$("#searchButton").click(function() {
			// if (!bar.isSearchPage()) {
			// 	$("#searchInput").blur();
			// 	view.push("search");
   //      	}
   			view.push("search");
        });
	},

	isSearchPage: function() {
		if (window.location.href.indexOf("views/search/") !== -1)
			return true;
		else
			return false;
	},
	isLoginPage: function(){
		if (window.location.href.indexOf("views/login/") !== -1)
			return true;
		else
			return false;
	},

	setValues: function() {
		$("#bar").css("height", bar.height);
		$("#main").css("margin-top", bar.height + bar.gap);

		$("#logoArea").css("width", bar.button.width);
		$("#searchArea").css("left", bar.button.width);
		$("#searchArea").css("right", bar.button.width);
		$("#buttonArea").css("width", bar.button.width);
	}
}


