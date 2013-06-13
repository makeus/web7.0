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
    getInfo(dlid, function(items){
		var relations = parseRelations(items.relations);
		$.each(relations, function(i, item) {
			getInfo(item, function(info) {
				if(info.type == type) {
					appendRelationsList(info);
				}
			});
		});
        $("#relationslist").listview("refresh");
	});
    $("#rightpanel img").load(function() {
		setRightBarActiveLink();
    });

});


function appendRelationsList(dlid) {
	var li = "<li>";
	if(dlid.img!=""){
		li += '<img src="' + dlid.img + '"" alt="kuva"></img>';
	}else{
		li += '<img class=\"emptyRelationImage\" src="'+'../../resources/images/tyhja.png'+'"" alt="kuva"></img>';
	}
    li += "<div>"
	li += "<h2>" + dlid.name + "</h2>";
	li += "<h3>" + dlid.type + "</p>";
    li += "</div>"
	li += "<i id='delete" + dlid.DL_id + "' class=\"icon-remove\" ></i>";      // TÄHÄN POISTO KUNHAN SEMMOINEN TEHDÄÄN
	li += "</li>";

	$("#relationslist").append(li);
	
	// $("li#relationList" + dlid.DL_id).click(function() {
	// 	view.push("EPage", "index.html?dlid=" + dlid.DL_id);
	// });
}

function setEntityInformation(){
    $("#entityRole").text($("#leftpanel .bar_role").text());
    $("#entityName").text($("#leftpanel .bar_name").text());
}

function setRightBarActiveLink(){
    var type = getURLParameter("type");

    switch(type) {
        case 'user':
            $("#entityStreamType").text("Users");
            $("#linklistrightUsers").addClass("active");
            break;
        case 'group':
            $("#entityStreamType").text("Groups");
            $("#linklistrightGroups").addClass("active");
            break;
        case 'animal':
            $("#entityStreamType").text("Animals");
            $("#linklistrightAnimals").addClass("active");
            break;
        case 'project':
            $("#entityStreamType").text("Projects");
            $("#linklistrightProjects").addClass("active");
            break;            
        case 'contract':
            $("#entityStreamType").text("Contracts");
            $("#linklistrightContracts").addClass("active");
            break;
        case 'thing':
            $("#entityStreamType").text("Things");
            $("#linklistrightThings").addClass("active");
            break;
        case 'space':
            $("#entityStreamType").text("Spaces");
            $("#linklistrightSpaces").addClass("active");
            break;
        default:
            $("#entityStreamType").text("Relations");
    }
}