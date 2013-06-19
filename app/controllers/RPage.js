function initRPage() {
	setupPage({
        bar: true,
        barBackButton: false
    });

	var dlid = getParameter("dlid");
	if(dlid == null) {
		dlid = getDL_id();
	}
	var type = getParameter("type");
    if(type == null) {
        type = "user";
    }
    getInfo(dlid, function(items){
		var relations = parseRelations(items.relations);

		$.each(relations, function(i, item) {
			getInfo(item.dlid, function(info) {
				if(info.type == type)
					appendRelationsList(info);
			});
		});
        $("#relationslist").listview().listview("refresh");
	});

}


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
	
	 $("li#relationList" + dlid.DL_id).click(function() {
        view.push("EPage", {'dlid': dlid.DL_id});           //view.push("EPage", "index.html?dlid=" + dlid.DL_id);
	 });
}
