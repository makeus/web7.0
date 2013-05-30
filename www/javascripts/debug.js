function isSteroids() {
	if (navigator.userAgent.indexOf("AppGyverSteroids") !== -1)
		return true;
	else
		return false;
}


function createDebugButtons() {
	createButton({
		id: "adele",
		name: "Adele Vuohi",
		username: "adele.vuohi@gmail.com",
		password: "vuori"
	});

	createButton({
		id: "kristian",
		name: "Kristian",
		username: "kristian.pulkkinen@cs.helsinki.fi",
		password: "stalin"
	});
}


function createButton(info) {
	$("#main").append("<button id='"+info.id+"'>"+info.name+"</button>");
	$("#"+info.id).hammer().on("tap", function() {
		login(info.username, info.password);

		if (getStatus() == -1) {
			$("#failLogin").removeAttr("hidden");
		} else if (getStatus() == 0) {
			alert("Timeout!");
		} else if (getStatus() == 1) {
			pushView("frontpage");
		} else {
			alert("ERROR " + res);
		}
	});
}