function isSteroids() {
	if (navigator.userAgent.indexOf("AppGyverSteroids") !== -1)
		return true;
	else
		return false;
}


function createDebugButtons() {
	createButton({
		name: "Adele Vuohi",
		username: "adele.vuohi@gmail.com",
		password: "vuori"
	});

	createButton({
		name: "Kristian",
		username: "kristian.pulkkinen@cs.helsinki.fi",
		password: "stalin"
	});
	
	createButton({
		name: "Sampo",
		username: "sampo.laurila@gmail.com",
		password: "vuohi3"
	});

	createButton({
		name: "Mathias",
		username: "mathias.keus@helsinki.fi",
		password: "pf6sg4ai"
	});
}


function createButton(info) {
	var id = info.name.replace(" ", "_");

	$("#main").append("<button id='"+id+"'>"+info.name+"</button>");
	$("#"+id).click(function() {
		login(info.username, info.password,function(){
			if (getStatus() == -1) {
				$("#failLogin").removeAttr("hidden");
			} else if (getStatus() == 0) {
				alert("Timeout!");
			} else if (getStatus() == 1) {
				view.push("frontpage");
			} else {
				alert("ERROR " + res);
		}
		});

		
	});
}