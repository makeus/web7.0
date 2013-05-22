var url =  "https://www.dliv.in/rest/";

function loginRest(username, password){
	$.ajax(
	{
		url: url+"Authtoken",
		dataType: "json",
		async: false,
		data: {u: username, p: password},
		success: checkLogin
	});
}

var infoStream;
//todo add limit & offset when they work
function getActivityStream(userId,authToken){
	$.ajax(
	{
		url: url+"stream",
		dataType: "json",
		async: false,
		data: {uid: userId, auth: authToken},
		success: function(data){
			infoStream=data;
		}
	});
	return infoStream;
}