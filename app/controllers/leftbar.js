document.addEventListener("DOMContentLoaded",function(){
	var dlid = getURLParameter("dlid");
	if(dlid == null) {
		dlid = getDL_id();
	}
	var info = getInfo(dlid);
	setInfo(info);
	createLinks(dlid);


});

function setInfo(info) {
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

function createLinks(dlid) {

	var baselink = "../EPage/index.html?dlid=" + dlid;
	var links = new Array();
	var urls = new Array();

	links[0] = "Messages";
	urls[0] =  baselink + "&type=message";
	links[1] = "Tasks";
	urls[1] =  baselink + "&type=tasks";

	$.each(links, function(i, item) {
		$("#linklist").append("<a href=" + urls[i] + ">" + item + "</a>\n");
	});
}