function isSteroids() {
	if (navigator.userAgent.indexOf("AppGyverSteroids") !== -1)
		return true;
	else
		return false;
}

function printDebugInfo() {
	console.log("Name:  "+getName());
	console.log("DL_id: "+getDL_id());
	console.log("Token: "+getToken());
	console.log("Image: "+getImage());
	console.log("Relations:");
	console.log(getRelations());
}



var buttons = [];
var tick = 0;
var documentHeight;
var interval;


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
	
    interval = setInterval(moveButtons, 100);
}


function createButton(info) {
    documentHeight = $(document).height();
    
	var id = "button"+buttons.length;
	var elem = $("<button id='"+id+"'>"+info.name+"</button>");
	
	var button = {
		elem: elem,
		x: random.x(),
		y: random.y(),
		phase: random.phase(),
        fall: random.fall(),
		
		color: [
			[random.color(), random.coin(), random.changeSpeed()],	// text red
			[random.color(), random.coin(), random.changeSpeed()],	// text green
			[random.color(), random.coin(), random.changeSpeed()],	// text blue
			[random.color(), random.coin(), random.changeSpeed()],	// background red
			[random.color(), random.coin(), random.changeSpeed()],	// background green
			[random.color(), random.coin(), random.changeSpeed()]		// background blue
		]
    };
	
	var color = createColor(button.color);
	var bgcolor = createBackgroundColor(button.color);
	
    elem.css("position", "absolute");
    elem.css("top", button.x);
    elem.css("left", button.y);
	
	elem.css("font-weight", "bolder");
	elem.css("color", color);
	elem.css("background-color", bgcolor);
	elem.css("padding", "10px");
	elem.css("width", "120px");
    
    elem.click(function() {
		login(info.username, info.password, function() {
			if (getStatus() == -1) {
				$("#failLogin").removeAttr("hidden");
			} else if (getStatus() == 0) {
				alert("Timeout!");
			} else if (getStatus() == 1) {
				view.push("frontpage");
				removeButtons();
			} else {
				alert("ERROR");
			}
		});
	});
	
	$("body").append(elem);
    buttons.push(button);
}


function moveButtons() {
	++tick;
	
    $.each(buttons, function(i, button) {
        button.y = button.y + button.fall;
        button.x = button.x + Math.sin((tick+button.phase)/10)*6;
		
		if (button.y > documentHeight)
			button.y = -40;
		
		button.elem.css("left", button.x);
		button.elem.css("top", button.y);
		
		for (var i=0; i<button.color.length; ++i) {
			var change = changeColor(button.color[i][0], button.color[i][1], button.color[i][2]);
			button.color[i][0] = change[0];
			button.color[i][1] = change[1];
		}
		
		button.elem.css("color", createColor(button.color));
		button.elem.css("background-color", createBackgroundColor(button.color));
    });
}

var random = {
	y: function() {
		return Math.random() * $(document).height();
	},
	
	x: function() {
		return Math.random() * 100 + 80;
	},
	
	phase: function() {
		return Math.random() * 1000 ;
	},
	
	fall: function() {
		return Math.random() * 2 + 1;
	},
	
	color: function() {
		return Math.floor(Math.random()*255);
	},
	
	coin: function() {
		return (Math.random() < 0.5);
	},
	
	changeSpeed: function() {
		return Math.floor(Math.random() * 4) + 2;
	}
};

	
function changeColor(color, up, speed) {
	if (up) color += speed;
	else    color -= speed;

	if (color >= 255) {
		color = 255;
		up = false;
	}
	if (color <= 0) {
		color = 0;
		up = true;
	}

	return [color, up];
}

function createColor(color) {
	return "rgb("+color[0][0]+","+color[1][0]+","+color[2][0]+")";
}

function createBackgroundColor(color) {
	return "rgb("+color[3][0]+","+color[4][0]+","+color[5][0]+")";
}

function removeButtons() {
	$.each(buttons, function(i, button) {
		button.elem.remove();
	});

	window.clearInterval(interval);
}