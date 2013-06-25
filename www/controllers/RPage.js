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


    var checked = false;

    getInfo(dlid, function(items){
		var relations = parseRelations(items.relations);
		var dlids = "";
		$.each(relations,function(i,item){
			dlids += item.dlid + ",";
		});
		dlids=dlids.slice(0,-1);
		getUserArray(dlids,function(userArr){
			$.each(userArr,function(i,item){
				if(item.type == type){
					appendRelationsList(item);
					checked = true;
				}
				if(i == relations.length -1) {
					if(!checked) {
    					$("#main div").replaceWith("<section id=\"relationMessage\"><h3>The stream is empty</h3><h3>no relations were found!</h3></section>"); 
					}
				}
			});
		});
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
	li += "</li>";

	$("#relationslist").append(li);
	
	 $("li#relationList" + dlid.DL_id).click(function() {
        view.push("BPage", {'dlid': dlid.DL_id});           
	 });
}
