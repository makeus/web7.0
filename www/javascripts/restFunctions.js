var url =  "https://www.dliv.in/rest/";
function saveToken(data){
	if(data.success!="0"){
		localStorage.setItem('authtoken',data.authtoken);
	}
}
function saveDL_id(data){
	if(data.success!="0"){
		localStorage.setItem('DL_id',data.DL_id);
	}
}
function loginRest(username, password){
	localStorage.removeItem('authtoken');
	$.ajax(
	{
		url: url+"Authtoken",
		dataType: "json",
		async: false,
		data: {u: username, p: password},
		success: function(data){
			saveToken(data);
			saveDL_id(data);
		}
	});
}
function getToken(){
	return localStorage.getItem('authtoken');
}
function getDL_id(){
	return localStorage.getItem('DL_id');
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