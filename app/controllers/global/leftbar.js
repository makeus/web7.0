function leftbarSetInfo(info) {
	var image = "";
    if(info.img == "") {
        image = '../../resources/images/tyhja.png';
    } else {
        image = info.img
    }

    $("#leftbar_img").attr('src',image);
    $("#leftbar_img").attr('alt',info.name);
    $("#leftbar_role").text(info.type);
    $("#leftbar_name").text(info.name);
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
	links[2] = "To-Do Notes";
	urls[2] = baselink + "#";
	icons[2] = "<i class=\"icon-edit\"></i>";
	links[3] = "Files";
	urls[3] = baselink + "#";
	icons[3] = "<i class=\"icon-file-alt\"></i>";
	links[3] = "Files";
	urls[3] = baselink + "#";
	icons[3] = "<i class=\"icon-file-alt\"></i>";
	
	links[4] = "Basic-info";
	urls[4] = "../BPage/index.html?dlid=" + dlid;
	icons[4] = "<i class=\"icon-user\"></i>";

	$.each(links, function(i, item) {
		$("#linklist").append("<li id='linklist" + item + "'><a>" + icons[i] + " " + item + "</a></li>");
		$("#linklist" + item).click(function() {
			$("#leftpanel").panel( "close" );
			view.push("EPage", urls[i]);
		});
	});
	$("#linklist").listview("refresh");
}