$(document).ready(function() {
//document.addEventListener("deviceready",function(){
	$("#loginButton").click(function(){
		var username = document.getElementById('loginUsername').value;
		var password = document.getElementById('loginPassword').value;
		alert(username);
		alert(password);
		login(username, password);
		if( (getToken()!=null) && (getToken()!="undefined") ){
			window.location.replace('frontpage.html');
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

});
