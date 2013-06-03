document.addEventListener("DOMContentLoaded",function(){

	var dlid = getURLParameter("dlid");
	if(dlid == null) {
		dlid = getDL_id();
	}
	var baselink = "../EPage/EPage?dlid=" + dlid;
	var links = new Array();
	var urls = new Array();

	links[0] = "Messages";
	urls[0] =  baselink + "&type=message";
	links[1] = "Tasks";
	urls[1] =  baselink + "&type=tasks";

	$.each(links, function(i, item) {
		$("#linklist").append("<a href=" + urls[i] + ">" + item + "</a>\n");
	});

});