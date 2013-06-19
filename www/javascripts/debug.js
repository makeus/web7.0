function isSteroids() {
	if (navigator.userAgent.indexOf("AppGyverSteroids") !== -1)
		return true;
	else
		return false;
}

function printDebugInfo() {
	console.log("Name:  "+getName());
	console.log("DL_id: "+getDL_id())
	console.log("Token: "+getToken());
	console.log("Image: "+getImage());
	console.log("Relations:")
	console.log(getRelations());
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
	createButton({
		name: "Ivan",
		username: "ivan.tadic014@gmail.com",
		password: "roki014"
	});
}


function createButton(info) {
	var id = info.name.replace(" ", "_");

	var marqueeStuff = "direction='"+randomDirection()+"' scrollamount='"+randomSpeed()+"'";
	$("#main").append("<marquee "+marqueeStuff+"><button id='"+id+"'>"+info.name+"</button></marquee>");
	
	var button = $("#"+id);
	button.css("font-weight", "bolder");
	button.css("color", randomColor());
	button.css("background-color", randomColor());
	
	button.click(function() {
		login(info.username, info.password, function() {
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

function randomColor() {
	var r = Math.floor(Math.random()*255);
	var g = Math.floor(Math.random()*255);
	var b = Math.floor(Math.random()*255);
	return "rgb("+r+","+g+","+b+")";
}

function randomDirection() {
	if (Math.random() < 0.5)
		return "left";
	else
		return "right";
}

function randomSpeed() {
	return Math.floor(Math.random()*20)+1;
}