// You can implement login buttons on login screen by calling
//   createDebugButtons() in initLogin() at controllers/login.js
function createDebugButtons() {
	// To create login button use createButton() with object
	//   parameter which contains buttonName, username, password.
	//
	// (buttonName can be anything)

	/* Example:

	createButton({
		buttonName: "Pekka Pouta",
		username: "pekka.pouta@mail.com",
		password: "pekkaonparas"
	});

	*/

	
}


function createButton(info) {
	var id = info.buttonName.replace(" ", "_");

	$("#main").append("<button id='"+id+"'>"+info.buttonName+"</button>");
	
	var button = $("#"+id);
	button.css("font-weight", "bolder");
	button.css("color", randomColor());
	button.css("background-color", randomColor());
	button.css("padding", "10px");
	
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