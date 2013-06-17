document.addEventListener("DOMContentLoaded", function() {
	setupPage({
        bar: false
    });

	$("#loginButton").click(function(){
		var username = document.getElementById('loginUsername').value;
		var password = document.getElementById('loginPassword').value;
		login(username, password,function(){
			if(getStatus() == -1) {
			$("#failLogin").show();
		} else if (getStatus() == 1) {
			view.push("frontpage");
		}
		});

		
	});
	
	$("#loginUsername").keyup(function(event){
    if(event.keyCode == 13){
        $("#loginPassword").focus();
    }
	});
	$("#loginPassword").keyup(function(event){
    	if(event.keyCode == 13){
        	$("#loginButton").click();
    }
	});

	createDebugButtons();
});



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
					saveImage(data.img);
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
