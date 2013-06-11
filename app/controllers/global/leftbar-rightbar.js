function sidebarsSetInfo(info) {
	var image = "";
    if(info.img == "") {
        image = '../../resources/images/tyhja.png';
    } else {
        image = info.img
    }

    $(".bar_img").attr('src',image);
    $(".bar_img").attr('alt',info.name);
    $(".bar_role").text(info.type);
    $(".bar_name").text(info.name);
}

function leftbarCreateLinks(dlid) {
	var baselink = "index.html?dlid=" + dlid;
	var links = new Array();
	var urls = new Array();
	var icons = new Array();

	links[0] = "Messages";
	urls[0] =  baselink + "&type=message";
	icons[0] = "<i class=\"icon-envelope\"></i>";
	links[1] = "Tasks";
	urls[1] =  baselink + "&type=cal";
	icons[1] = "<i class=\"icon-calendar\"></i>";
	links[2] = "Notes";
	urls[2] = baselink + "&type=note";
	icons[2] = "<i class=\"icon-edit\"></i>";
	links[3] = "Files";
	urls[3] = baselink + "#";
	icons[3] = "<i class=\"icon-file-alt\"></i>";



	$.each(links, function(i, item) {
		$("#linklistleft").append("<li id='linklistleft" + item.replace(/\s+/g, ' ') + "'><a>" + icons[i] + "\t" + item + "</a></li>");
		$("#linklistleft" + item.replace(/\s+/g, ' ')).click(function() {
			$("#leftpanel").panel( "close" );
			view.push("EPage", urls[i]);
		});
	});
	$("#linklistleft").listview("refresh");
}

function rightbarCreateLinks(dlid) {
	var baselink = "index.html?dlid=" + dlid;
	var links = new Array();
	var urls = new Array();
	var icons = new Array();

	links[0] = "Users";
	urls[0] =  baselink + "&type=user";
	icons[0] = "<i class=\"icon-user\"></i>";
	links[1] = "Groups";
	urls[1] =  baselink + "&type=group";
	icons[1] = "<i class=\"icon-group\"></i>";
	links[2] = "Places";
	urls[2] = baselink + "&type=space";
	icons[2] = "<i class=\"icon-map-marker\"></i>";
	links[3] = "Things";
	urls[3] = baselink + "&type=thing";
	icons[3] = "<i class=\"icon-barcode\"></i>";
	links[4] = "Animals";
	urls[4] = baselink + "&type=animal";
	icons[4] = "<i class=\"icon-github-sign\"></i>";
	links[5] = "Projects";
	urls[5] = baselink + "&type=project";
	icons[5] = "<i class=\"icon-briefcase\"></i>";
	links[6] = "Contracts";
	urls[6] = baselink + "&type=contract";
	icons[6] = "<i class=\"icon-legal\"></i>";


	$.each(links, function(i, item) {
		$("#linklistright").append("<li class=\"ui-btn-icon-left rightlinklistitem\"  id='linklistright" + item + "'><a>" + item + "\t" + icons[i] + "</a></li>");
		$("#linklistright" + item).click(function() {
			$("#rightpanel").panel( "close" );
			view.push("RPage", urls[i]);
		});
	});
	$("#linklistright").listview("refresh");
	$("li.rightlinklistitem span.ui-icon-arrow-r").toggleClass("ui-icon-arrow-r ui-icon-arrow-l");
	$("li.rightlinklistitem a").addClass("rightpanellink");
}
