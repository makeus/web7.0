bar = {
	height: 80,
	gap: 20,
	button: {
		width: 80
	},

	show: function() {
		$("#bar").show();
		//bar.setValues();
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
	

		$("#ownPictureButton").off();
		$("#ownPictureButton").on('tap', function(){
			view.push("frontpage");
		});
		$("#backButton").off();
		$("#backButton").on('tap', function(){
			view.pop();
		});
		$("#barLogo").off();
		$("#barLogo").on('tap', function() {
			$( "#leftpanel" ).panel( "open" );
		});
		$("#relationsButton").off();
		$("#relationsButton").on('tap', function(){
			$( "#rightpanel" ).panel( "open" );
		});
		$("#searchButton").off();
		$("#searchButton").on('tap', function() {
   			view.push("search");
        });
        $("#settingsButton").off();
        $("#settingsButton").on('tap', function(){
        	bar.showSettingsList();
        });
        $("#settingsList :first-child").off(),
        $("#settingsList :first-child").on('tap', function(){
        	view.push("login");
        });
	},



	showSettingsList: function(){
		setTimeout(function(){
			$("body").on('tap', function(elem){
				if (!isSettingsList(elem)) {
					bar.hideSettingsList();
				}
			});
		},500);
		$("#settingsList").css("display","table");
		var x = $("#settingsButton").position().left;
		$("#settingsList").css("left",x+"px");
		$("#settingsButton").off();
		$("#settingsButton").on('tap', function(){
			bar.hideSettingsList();
			bar.hideRelationsList();
		});
		

		var dlid = getParameter("dlid");

		if (dlid !== undefined) {
			$("#connectToMeButton").show();
			$("#connectToMeButton").off();
			$("#connectToMeButton").on('tap', function(){
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
		$("#settingsButton").on('tap', function(){
			bar.showSettingsList();
		});
		bar.hideRelationsList();
	},


	showRelationsList: function() {
		$("#connectToMeButton").off();
		$("#connectToMeButton").on('tap', function(){
        	bar.hideRelationsList();
        });

		var relations = ["-", "User", "Service provider", "Owner", "Child", "Parent", "Friend"];

		$.each(relations, function(i, item) {
			var id = item.replace(" ", "_");
			$("#relationsList").append("<li id='"+id+"' ><div>"+item+"</div></li>");
			$("#"+id).on('tap', function() {
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
