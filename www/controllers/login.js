function initlogin() {

	setupPage({
	    bar: false,
	    barBackButton: false,
	    footer: false
	});
	
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
				$("#ownPictureButton").attr("src",getImage());

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
