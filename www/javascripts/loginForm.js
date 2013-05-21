$(document).ready(function() {
//document.addEventListener("deviceready",function(){
	$("#loginButton").click(function(){
		var username = document.getElementById('loginUsername').value;
		var password = document.getElementById('loginPassword').value;
		loginRest(username, password);
		if(getToken()!=null){
			window.location.replace('frontpage.html');
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

});
