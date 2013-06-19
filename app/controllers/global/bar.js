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
		});
		$("#searchButton").click(function() {
   			view.push("search");
        });
        $("#settingsButton").click(function(){
        	bar.showSettingsList();
        });
        $("#settingsList :first-child").click(function(){
        	view.push("login");
        });
	},



	showSettingsList: function(){
		setTimeout(function(){
			$("body").click(function(elem){
				if (!isSettingsList(elem)) {
					bar.hideSettingsList();
				}
			});
		},500);
		$("#settingsList").css("display","table");
		var x = $("#settingsButton").position().left;
		$("#settingsList").css("left",x+"px");
		$("#settingsButton").off();
		$("#settingsButton").click(function(){
			bar.hideSettingsList();
			bar.hideRelationsList();
		});
		

		var dlid = getParameter("dlid");

		if (dlid !== undefined) {
			$("#connectToMeButton").show();
			$("#connectToMeButton").off();
			$("#connectToMeButton").click(function(){
	        	bar.showRelationsList();
	        });
		} else {
			$("#connectToMeButton").hide();
		}
	},
	hideSettingsList: function(){
		$("body").off();
		$("#settingsList").css("display","none");
		$("#settingsButton").off();
		$("#settingsButton").click(function(){
			bar.showSettingsList();
		});
		bar.hideRelationsList();
	},


	showRelationsList: function() {
		$("#connectToMeButton").off();
		$("#connectToMeButton").click(function(){
        	bar.hideRelationsList();
        });

		var relations = ["-", "User", "Service provider", "Owner", "Child", "Parent", "Friend"];

		$.each(relations, function(i, item) {
			var id = item.replace(" ", "_");
			$("#relationsList").append("<li id='"+id+"' ><div>"+item+"</div></li>");
			$("#"+id).click(function() {
				bar.hideSettingsList();
				// Tähän relaatiofunktiohässäkkä
			});
		});

		$("#relationsList").css("display", "table");
	},
	hideRelationsList: function() {
		$("#relationsList").empty();
		$("#connectToMeButton").off();
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


function isSettingsList(elem) {
	var target = elem.target;

	while (target !== null) {
		if (target.id != undefined)
			if (target.id === "settingsList")
				return true;

		target = target.parentElement;
	}
	return false;
}
