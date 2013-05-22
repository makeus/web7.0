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
function getActivityStream(userId,authToken,offset,limit){
	$.ajax(
	{
		url: url+"stream",
		dataType: "json",
		async: false,
		data: {uid: userId, auth: authToken, offset: offset, limit: limit},
		success: function(data){
			infoStream=data;
		}
	});
	return infoStream;
}