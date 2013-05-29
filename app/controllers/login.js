//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function() {
	setPage({
        bar: false
    });

	$("#loginButton").click(function(){
		var username = document.getElementById('loginUsername').value;
		var password = document.getElementById('loginPassword').value;
		login(username, password);

		if(getStatus() == -1) {
			$("#failLogin").removeAttr("hidden");
		} else if (getStatus() == 1) {
			pushView("frontpage");
		}
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

	createAdeleButton();
	createKristianButton();
});



function login(username, password){
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
			}
		},
		function(data,t,m){
			error(data,t,m)
		});

}
