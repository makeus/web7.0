var url =  "https://www.dliv.in/rest/Authtoken"
function saveToken(data){
	localStorage.setItem('authtoken',data.authtoken);
}
function loginRest(username, password){
	localStorage.removeItem('authtoken');
	$.ajax(
	{
		url: url,
		dataType: "json",
		async: false,
		data: {u: username, p: password},
		success: saveToken
	});
}
function getToken(){
	return localStorage.getItem('authtoken');
}
