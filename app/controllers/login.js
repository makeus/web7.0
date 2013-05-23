//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function() {
	$("#loginButton").click(function(){
		var username = document.getElementById('loginUsername').value;
		var password = document.getElementById('loginPassword').value;
		var res = login(username, password);

		/*
		* Res saa arvoja, mikä tilanne on
		* -1 väärät tunnukset
		* 0 timeout
		* 1 onnistunut kirjautuminen
		* MUUT, kuten 404, 500 jne. ovat http error codejen mukaisia virheitä
		*/

		if(res == -1) {
			$("#failLogin").removeAttr("hidden");
		} else if (res == 0) {
			alert("Timeout!");
		} else if (res == 1) {
			var webView = new steroids.views.WebView("views/frontpage/index.html");
			steroids.layers.push(webView);

			if(navigator.userAgent == "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36") {
				window.location.replace("../frontpage/index.html");
			}

		} else {
			alert("ERROR " + res);
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

	$("#nappi").hammer().on("tap", function() {
		alert("Herp");
	});
});

var status = 0;


function login(username, password){
	if(username == null || password == null) {
		return status = -1;
	}
	localStorage.removeItem('authtoken');
	localStorage.removeItem('DL_id');
	loginRest(username, password);
	return status;

}
