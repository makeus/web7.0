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
		alert(res);
		switch(res) {
			case(-1) {
				$("#failLogin").removeAttr("hidden");
			}
			case(0) {
				alert("Timeout!");
			}
			case(1) {
				var webView = new steroids.views.WebView("views/frontpage/index.html");
				steroids.layers.push(webView);
			}
			default() {
				alert("ERROR");
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