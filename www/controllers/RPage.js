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
		var exists = false;
		$.each(relations, function(i, item) {
			getInfo(item.dlid, function(info) {
				if(info.type == type){
					appendRelationsList(info);
					exists = true;
				}
			});
		});
		if (!exists){
			  $("#relationslist").replaceWith('<hr></hr><h3>The stream is empty</h3><h3>no ' + type + 's were found!</h3>'); 
		}

        $("#relationslist").listview().listview("refresh");
	});

}


function appendRelationsList(dlid) {
	var li = "<li id=\"relationList" + dlid.DL_id + "\">";
	if(dlid.img!=""){
		li += '<img src="' + dlid.img + '"" alt="kuva"></img>';
	}else{
		li += '<img class=\"emptyRelationImage\" src="'+'../resources/images/tyhja.png'+'"" alt="kuva"></img>';
	}
    li += "<div>"
	li += "<h2>" + dlid.name + "</h2>";
	li += "<h3>" + dlid.type + "</p>";
    li += "</div>"
	// li += "<i id='delete" + dlid.DL_id + "' class=\"icon-remove\" ></i>";      // TÄHÄN POISTO KUNHAN SEMMOINEN TEHDÄÄN
	li += "</li>";

	$("#relationslist").append(li);
	
	 $("li#relationList" + dlid.DL_id + " img, li#relationList" + dlid.DL_id + " div").click(function() {
        view.push("BPage", {'dlid': dlid.DL_id});           //view.push("EPage", "index.html?dlid=" + dlid.DL_id);
	 });
}
