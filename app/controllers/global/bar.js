bar = {
	height: 80,
	gap: 20,
	button: {
		width: 80
	},

	init: function() {
		bar.initListeners();
		
		bar.createConnectToMeButton();
		bar.createConnectToMeList();
	},

	show: function() {
		$("#bar").show();
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
        $("#logoutButton").off(),
        $("#logoutButton").on('tap', function(){
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
			bar.hideConnectToMeList();
		});
		
		var dlid = getParameter("dlid");

		if (getParameter("dlid") !== undefined)
			bar.showConnectToMeButton();
		else
			bar.hideConnectToMeButton();
	},
	hideSettingsList: function(){
		$("body").off();
		$("#settingsList").css("display","none");
		$("#settingsButton").off();
		$("#settingsButton").on('tap', function(){
			bar.showSettingsList();
		});
		bar.hideConnectToMeList();
	},



	createConnectToMeButton: function() {
		$("#connectToMeButton").off();
		$("#connectToMeButton").on('tap', function(){
        	bar.showConnectToMeList();
        });
	},
	showConnectToMeButton: function() {
		$("#connectToMeButton").show();
	},
	hideConnectToMeButton: function() {
		$("#connectToMeButton").hide();
	},
	createConnectToMeList: function() {
		var connectionTypes = ["-", "User", "Service provider", "Owner", "Child", "Parent", "Friend"];
		$.each(connectionTypes, function(i, type) {
			var id = type.replace(" ", "_");
			$("#connectToMeList").append("<li id='"+id+"' ><div>"+type+"</div></li>");
			$("#"+id).on('tap', function() {
				bar.hideSettingsList();
				createRelation("me", getParameter("dlid"), type);
			});
		});
	},
	showConnectToMeList: function() {
		$("#connectToMeButton").off();
		$("#connectToMeButton").on('tap', function(){
        	bar.hideConnectToMeList();
        });

		$("#connectToMeList").show();
	},
	hideConnectToMeList: function() {
		$("#connectToMeButton").off();
		$("#connectToMeButton").on('tap', function(){
			bar.showConnectToMeList();
		});

		$("#connectToMeList").hide();
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
