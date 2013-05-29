function isSteroids() {
	if (navigator.userAgent.indexOf("AppGyverSteroids") !== -1)
		return true;
	else
		return false;
}

function createAdeleButton() {
	$("#main").append("<button id='adele'>Adele Vuohi</button>");
	$("#adele").hammer().on("tap", function() {
		login("adele.vuohi@gmail.com", "vuori");

		if(getStatus() == -1) {
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

function createKristianButton() {
	$("#main").append("<button id='kristian'>Kristian</button>");
	$("#kristian").hammer().on("tap", function() {
		login("kristian.pulkkinen@cs.helsinki.fi", "stalin");

		if(getStatus() == -1) {
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