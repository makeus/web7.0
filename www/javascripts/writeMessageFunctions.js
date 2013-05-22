$(document).ready(function() {


//document.addEventListener("deviceready",function(){
	$("#sendMessage").click(function(){
		addMessage(getDL_id(), getDL_id(), $("#messageField")[0].value, "");
	});

});


