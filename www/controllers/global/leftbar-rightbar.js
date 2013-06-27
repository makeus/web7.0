var links = [{}];

function sidebarsSetInfo(info) {
	var image = "";
    if(info.img == "") {
        image = '../resources/images/tyhja.png';
    } else {
        image = info.img
    }

    $(".bar_img").attr('src',image);
    $(".bar_img").attr('alt',info.name);
    $(".bar_role").text(info.type);
    $(".bar_name").text(info.name);
}

function updateUrls(dlid) {
	$.each(links, function(i, item) {
		item['opts']['dlid'] = dlid;
		$("#" + item['id']).unbind();
		$("#" + item['id']).click(function() {
			$("#leftpanel").panel( "close" );
			$("#rightpanel").panel( "close");
			view.push(item['url'], item['opts']);
		});
	});
}

function setActive(name) {
	$.each(links, function(i, item) {
		if(((item['opts']['type'] === name) && (name !== undefined)) || ((item['opts']['type'] === undefined) && (getCurrent()["name"] === item['url']) && (name === undefined))) {
			$("#" + item['id']).addClass("active");
		} else {
			$("#" + item['id']).removeClass("active");
		}
	});
}

function leftbarCreateLinks() {

	$("#linklistleft").listview();

	links[0] = {'type': "Messages", 'id':'linklistleftMessages', 'url':'EPage', 'icon' : "<i class=\"icon-envelope\"></i>", 'opts' : {'type' : 'message'}};
	links[1] = {'type': "Tasks", 'id':'linklistleftTasks', 'url':'EPage', 'icon' : "<i class=\"icon-calendar\"></i>", 'opts' : {'type' : 'cal'}};
	links[2] = {'type': "Notes", 'id':'linklistleftNotes', 'url':'EPage', 'icon' : "<i class=\"icon-edit\"></i>", 'opts' : {'type' : 'note'}};
	links[3] = {'type': "Basic-Info", 'id':'linklistleftBasic-Info', 'url':'BPage', 'icon' : "<i class=\"icon-user\"></i>", 'opts' : {}};
// links[4] = {'type': "Files", 'id':'linklistleftFiles', 'url':'EPage', 'icon' : "<i class=\"icon-file-alt\"></i>", 'opts' : {}};
	for(var i = 0; i<4; i++) {
		$("#linklistleft").append("<li id='" + links[i]['id'] + "'><a>" + links[i]['icon'] + "\t" + links[i]['type'] + "</a></li>");
	}
	$("#linklistleft").listview("refresh");
}

function rightbarCreateLinks() {

	$("#linklistright").listview();

	links[4] = {'type': "Users", 'id':'linklistrightUsers', 'url':'RPage', 'icon' : "<i class=\"icon-user\"></i>", 'opts' : {'type' : 'user'}};
	links[5] = {'type': "Groups", 'id':'linklistrightGroups', 'url':'RPage', 'icon' : "<i class=\"icon-group\"></i>", 'opts' : {'type' : 'group'}};
	links[6] = {'type': "Places", 'id':'linklistrightPlaces', 'url':'RPage', 'icon' : "<i class=\"icon-map-marker\"></i>", 'opts' : {'type' : 'space'}};
	links[7] = {'type': "Things", 'id':'linklistrightThings', 'url':'RPage', 'icon' : "<i class=\"icon-barcode\"></i>", 'opts' : {'type' : 'thing'}};
	links[8] = {'type': "Animals", 'id':'linklistrightAnimals', 'url':'RPage', 'icon' : "<i class=\"icon-github-sign\"></i>", 'opts' : {'type' : 'animal'}};
	links[9] = {'type': "Projects", 'id':'linklistrightProjects', 'url':'RPage', 'icon' : "<i class=\"icon-briefcase\"></i>", 'opts' : {'type' : 'project'}};
	links[10] = {'type': "Contracts", 'id':'linklistrightContracts', 'url':'RPage', 'icon' : "<i class=\"icon-legal\"></i>", 'opts' : {'type' : 'contract'}};

	for(var i = 4; i<11; i++) {
		$("#linklistright").append("<li class=\"ui-btn-icon-left rightlinklistitem\"  id='" + links[i]['id'] + "'><a>" + links[i]['type'] + "\t" + links[i]['icon'] + "</a></li>");
	}

	$("#linklistright").listview("refresh");
	$("li.rightlinklistitem span.ui-icon-arrow-r").toggleClass("ui-icon-arrow-r ui-icon-arrow-l");
	$("li.rightlinklistitem a").addClass("rightpanellink");
}
