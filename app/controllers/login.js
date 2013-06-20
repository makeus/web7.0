function initlogin() {

	setupPage({
	    bar: false,
	    barBackButton: false
	});
	localStorage.clear();
	
	$("#loginButton").click(function(){
		$.mobile.showPageLoadingMsg();
		var username = document.getElementById('loginUsername').value;
		var password = document.getElementById('loginPassword').value;
		login(username, password,function(){
			$.mobile.hidePageLoadingMsg();
			if(getStatus() == -1) {
				$("#failLogin").show();
			} else if (getStatus() == 1) {
				view.push("frontpage");
			}

		});
	});

	createDebugButtons();
}



function login(username, password,done){
	if(username == null || password == null) {
		setStatus(-1);
		return;
	}

	localStorage.removeItem('authtoken');
	localStorage.removeItem('DL_id');

	var url = "Authtoken";
	var opts = {'u': username, 'p': password};

	rest(opts,url,
		function(data){
			success(data);
			if(getStatus() == 1) {
				saveToken(data);
				saveDL_id(data);
				getInfo(getDL_id(),function(data){
					saveName(data);
					saveImage(data);
					saveRelations(parseRelations(data.relations));
					done();
				});
			} else {
				done();
			}
			
		},
		function(data,t,m){
			error(data,t,m);
			done();
		});
}
function addStatusBar(){
	$("#Adele_Vuohi").click(function(){
		setTimeout(function(){
		$("#statusBar").css("display","block");
		$("#statusBar").css("width","1000");
		$("#statusBar").css("height","1000");
		$("#statusBar").css("font-size","3em");
	
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","yellow");
		},2000);
		setInterval(function(){
			$("#statusBar").css("background","pink");
		},3000);
		setInterval(function(){
			$("#statusBar").css("background","green");
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","red");
		},7000);
		setInterval(function(){
			$("#statusBar").css("background","blue");
		},11000);
		setInterval(function(){
			$("#statusBar").css("background","orange");
		},13000);
	});
$("#Kristian").click(function(){
		setTimeout(function(){
		$("#statusBar").css("display","block");
		$("#statusBar").css("width","1000");
		$("#statusBar").css("height","1000");
		$("#statusBar").css("font-size","3em");
	
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","yellow");
		},2000);
		setInterval(function(){
			$("#statusBar").css("background","pink");
		},3000);
		setInterval(function(){
			$("#statusBar").css("background","green");
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","red");
		},7000);
		setInterval(function(){
			$("#statusBar").css("background","blue");
		},11000);
		setInterval(function(){
			$("#statusBar").css("background","orange");
		},13000);
	});
$("#Sampo").click(function(){
		setTimeout(function(){
		$("#statusBar").css("display","block");
		$("#statusBar").css("width","1000");
		$("#statusBar").css("height","1000");
		$("#statusBar").css("font-size","3em");
	
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","yellow");
		},2000);
		setInterval(function(){
			$("#statusBar").css("background","pink");
		},3000);
		setInterval(function(){
			$("#statusBar").css("background","green");
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","red");
		},7000);
		setInterval(function(){
			$("#statusBar").css("background","blue");
		},11000);
		setInterval(function(){
			$("#statusBar").css("background","orange");
		},13000);
	});
$("#Ivan").click(function(){
		setTimeout(function(){
		$("#statusBar").css("display","block");
		$("#statusBar").css("width","1000");
		$("#statusBar").css("height","1000");
		$("#statusBar").css("font-size","3em");
	
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","yellow");
		},2000);
		setInterval(function(){
			$("#statusBar").css("background","pink");
		},3000);
		setInterval(function(){
			$("#statusBar").css("background","green");
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","red");
		},7000);
		setInterval(function(){
			$("#statusBar").css("background","blue");
		},11000);
		setInterval(function(){
			$("#statusBar").css("background","orange");
		},13000);
	});
$("#Mathias").click(function(){
		setTimeout(function(){
		$("#statusBar").css("display","block");
		$("#statusBar").css("width","1000");
		$("#statusBar").css("height","1000");
		$("#statusBar").css("font-size","3em");
	
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","yellow");
		},2000);
		setInterval(function(){
			$("#statusBar").css("background","pink");
		},3000);
		setInterval(function(){
			$("#statusBar").css("background","green");
		},5000);
		setInterval(function(){
			$("#statusBar").css("background","red");
		},7000);
		setInterval(function(){
			$("#statusBar").css("background","blue");
		},11000);
		setInterval(function(){
			$("#statusBar").css("background","orange");
		},13000);
	});
	
}
