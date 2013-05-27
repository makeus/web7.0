//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function() {
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
});



function login(username, password){
	if(username == null || password == null) {
		setStatus(-1);
		return;
	}
	localStorage.removeItem('authtoken');
	localStorage.removeItem('DL_id');
	loginRest(username, password);

}
