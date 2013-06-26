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
		$("#index footer").show();
	},

	hide: function() {
		$("#bar").hide();
		$("#index footer").hide();
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
		$("#ownPictureButton").click(function(){
			view.push("frontpage");
		});
		$("#backButton").off();
		$("#backButton").click(function(){
			view.pop();
		});
		$("#barLogo").off();
		$("#barLogo").click(function() {
			$( "#leftpanel" ).panel( "open" );
		});
		$("#relationsButton").off();
		$("#relationsButton").click(function(){
			$( "#rightpanel" ).panel( "open" );
		});
		$("#searchButton").off();
		$("#searchButton").click(function() {
   			view.push("search");
        });
        $("#settingsButton").off();
        $("#settingsButton").click(function(){
        	bar.showSettingsList();
        });
        $("#logoutButton").off(),
        $("#logoutButton").click(function(){
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
			bar.hideConnectToMeList();
		});
		
		var dlid = getParameter("dlid");

		if (dlid !== undefined && dlid !== getDL_id())
			bar.showConnectToMeButton();
		else
			bar.hideConnectToMeButton();
	},
	hideSettingsList: function(){
		$("body").off();
		$("#settingsList").css("display","none");
		$("#settingsButton").off();
		$("#settingsButton").click(function(){
			bar.showSettingsList();
		});
		bar.hideConnectToMeList();
	},
	createConnectToMeButton: function() {
		$("#connectToMeButton").off();
		$("#connectToMeButton").click(function(){
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
		// connectionTypes[x][0] shown on website, connectionTypes[x][1] used in REST request
		var connectionTypes = [
			["(default)", ""],
			["User", "user"],
			["Service provider", "provider"],
			["Owner", "owner"],
			["Child", "child"],
			["Parent", "parent"],
			["Friend", "friend"]];

		for (var i=0; i<connectionTypes.length; ++i) {
			$("#connectToMeList").append("<li id='connectionType"+i+"' ><div>"+connectionTypes[i][0]+"</div></li>");
			
			$("#connectionType"+i).click(function() {
				bar.hideSettingsList();
				
				createRelation(getDL_id(), getParameter("dlid"), connectionTypes[i][1], function() {
					getInfo(getDL_id(), function(data){
						saveRelations(parseRelations(data.relations));
					}, true);
				});
			});
		};
	},
	showConnectToMeList: function() {
		$("#connectToMeButton").off();
		$("#connectToMeButton").click(function(){
        	bar.hideConnectToMeList();
        });

		$("#connectToMeList").show();
	},
	hideConnectToMeList: function() {
		$("#connectToMeButton").off();
		$("#connectToMeButton").click(function(){
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

function createId(type) {
	var id = type.replace(" ", "_");
	id = id.replace("(", "");
	id = id.replace(")", "");
	return id;
}
