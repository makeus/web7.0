//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function() {
	$("#loginButton").click(function(){
		var username = document.getElementById('loginUsername').value;
		var password = document.getElementById('loginPassword').value;
		
		if(login(username, password == -1 )){
			//window.location.replace('frontpage.html');
			var webView = new steroids.views.WebView("views/frontpage/index.html");
			steroids.layers.push(webView);
		}

		$("#failLogin").removeAttr("hidden");

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

	$("#nappi").hammer().on("tap", function() {
		alert("Herp");
	});
});

var status = 0;

function saveToken(data){
	localStorage.setItem('authtoken',data.authtoken);
}
function saveDL_id(data){
	localStorage.setItem('DL_id',data.DL_id);
}
function getToken(){
	return localStorage.getItem('authtoken');
}
function getDL_id(){
	return localStorage.getItem('DL_id');
}
function login(username, password){
	if(username == null || password == null) {
		return status = -1;
	}
	localStorage.removeItem('authtoken');
	localStorage.removeItem('DL_id');
	loginRest(username, password);
	return status;

}
function checkLogin(data){
	if(data.success != 0) {
		status = 1;
		saveToken(data);
		saveDL_id(data);
		return;
	}
	status = -1;
}

function failLogin(data) {
	status = data.status;
}