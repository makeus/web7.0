var url =  "https://www.dliv.in/rest/";
function saveToken(data){
	localStorage.setItem('authtoken',data.authtoken);
}
function loginRest(username, password){
	localStorage.removeItem('authtoken');
	$.ajax(
	{
		url: url+"Authtoken",
		dataType: "json",
		async: false,
		data: {u: username, p: password},
		success: saveToken
	});
}
function getToken(){
	return localStorage.getItem('authtoken');
}



var infoStream;
function returnStream(data){
	infoStream=data;
}
//todo add limit & offset when they work
function getActivityStream(userId,authToken){
	$.ajax(
	{
		url: url+"stream",
		dataType: "json",
		async: false,
		data: {uid: userId, auth: authToken},
		success: returnStream
	});
	return infoStream;
}