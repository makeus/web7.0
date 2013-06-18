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
		$("#backButton").css("display", "block");
	},
	hideBackButton: function() {
		$("#backButton").css("display", "none");
	},

	initListeners: function() {
		$("#ownPictureButton").attr("src",getImage());
		$("#ownPictureButton").click(function(){
			view.push("frontpage");
		});
		$("#backButton").click(function(){
			view.pop();
		});
		$("#barLogo").click(function() {
			$( "#leftpanel" ).panel( "open" );
		});
		$("#relationsButton").click(function(){
			$( "#rightpanel" ).panel( "open" );

		})
		$("#searchButton").click(function() {
   			view.push("search");
        });
	},
	showSearch: function(){
		$("#searchArea").show();
		$("#ownPictureButton").hide();
		$("#searchButton").hide();
		$("#relationsButton").hide();
		$("#barLogo").hide();
		$("#settingsButton").hide();
	},
	hideSearch: function(){
		$("#searchArea").hide();
		$("#ownPictureButton").show();
		$("#searchButton").show();
		$("#relationsButton").show();
		$("#barLogo").show();
		$("#settingsButton").show();
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


