//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function() {
	$("#loginButton").click(function(){
		var username = document.getElementById('loginUsername').value;
		var password = document.getElementById('loginPassword').value;
		login(username, password);

		/*
		* Res saa arvoja, mikä tilanne on
		* -1 väärät tunnukset
		* 0 timeout
		* 1 onnistunut kirjautuminen
		* MUUT, kuten 404, 500 jne. ovat http error codejen mukaisia virheitä
		*/

		if(getStatus() == -1) {
			$("#failLogin").removeAttr("hidden");
		} else if (getStatus() == 1) {
			var webView = new steroids.views.WebView("views/frontpage/index.html");
			steroids.layers.push(webView);



			if(navigator.userAgent == "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36" ||
				navigator.userAgent == "Mozilla/5.0 (Unknown; Linux i686) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.0 Safari/534.34") {
				window.location.replace("../frontpage/index.html");
			}

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



function login(username, password){
	if(username == null || password == null) {
		setStatus(-1);
		return;
	}
	localStorage.removeItem('authtoken');
	localStorage.removeItem('DL_id');
	loginRest(username, password);

}
