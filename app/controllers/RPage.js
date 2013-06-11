document.addEventListener("DOMContentLoaded",function(){
	setupPage({
        bar:true
    });

	var dlid = getURLParameter("dlid");
	if(dlid == null) {
		dlid = getDL_id();
	}
	var type = getURLParameter("type");
    if(type == null) {
        type = "user";
    }

	var relations = parseRelations(getInfo(dlid).relations);

	$.each(relations, function(i, item) {
		info = getInfo(item[0]);
		console.log(info.type);
		if(info.type == type) {
			appendRelationsList(info);
		}
	});

	setRightBarActiveLink();

});


function appendRelationsList(dlid) {
	var li = "<li id='relationList" + dlid.DL_id + "'>";
	if(dlid.img!=""){
		li += '<img class="searchImages" src="' + dlid.img + '"" alt="kuva"></img>';
	}else{
		li += '<img class="emptySearchImages" src="'+'../../resources/images/tyhja.png'+'"" alt="kuva"></img>';
	}
	li += "<div><h2>" + dlid.name + "</h2>";
	li += "<h3>" + dlid.type + "</h3></div>";
	li += "<a href=#>x</a>";      // TÄHÄN POISTO KUNHAN SEMMOINEN TEHDÄÄN
	li += "</li>";

	$("#relationslist").append(li);
	
	$("li#relationList" + dlid.DL_id).click(function() {
		view.push("EPage", "index.html?dlid=" + dlid.DL_id);
	});
}

function setRightBarActiveLink(){
    var type = getURLParameter("type");

    switch(type) {
        case 'cal':
            $("#entityStreamType").text("Tasks & Events");
            $("#linklistleftTasks").addClass("active");
            break;
        case 'message':
            $("#entityStreamType").text("Messages");
            $("#linklistleftMessages").addClass("active");
            break;
        case 'note':
            $("#entityStreamType").text("To-Do Notes");
            $("#linklistleftNotes").addClass("active");
            break;
        default:
            $("#entityStreamType").text("Messages");
    }
}