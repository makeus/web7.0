var url =  "https://www.dliv.in/rest/";
function loginRest(username, password){
	$.ajax(
	{
		url: url+"Authtoken",
		dataType: "json",
		async: false,
		data: {u: username, p: password},
		success: checkLogin,
		error: failLogin
	});
}

var infoStream;
function getActivityStream(userId,authToken,offset,limit,types){
	infoStream="";
	$.ajax(
	{
		url: url+"stream",
		dataType: "json",
		async: false,
		data: {
			uid: userId, 
			auth: authToken, 
			offset: offset, 
			limit: limit, 
			types: types
		},
		success: function(data){
			infoStream=data;
		},
		error: status = 0
	});
	return infoStream;
}

function addActivity(uid, auth, to_dl_id, from_dl_id, type, subject, link) {
	$.ajax(
	{
		url: url+"addactivity2",
		type: "POST",
		async: false,
		data: {
			uid: uid, 
			auth: auth, 
			to_dl_id: to_dl_id, 
			from_dl_id: from_dl_id, 
			type: type, 
			subject: subject, 
			link: link
		},
		success: successActivity,
		error: failActivity
	});
}




function saveToken(data){
	localStorage.setItem('authtoken',data.authtoken);
}
function saveDL_id(data){
	localStorage.setItem('DL_id',data.DL_id);
}
function getToken(){
	return localStorage.getItem('authtoken');
}
function getDL_id(){
	return localStorage.getItem('DL_id');
}