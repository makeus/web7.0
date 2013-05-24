var url =  "https://www.dliv.in/rest/";
var status = 0;

function loginRest(username, password){
	status = 0;
	$.ajax(
	{
		url: url+"Authtoken",
		dataType: "json",
		async: false,
		data: {u: username, p: password},
		success: function(data){
			success(data);
			if(getStatus() == 1) {
					saveToken(data);
					saveDL_id(data);
			}
		},
		error: error
	});
}

var infoStream;

function getActivityStream(userId,authToken,offset,limit,types){
	status = 0;
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
		success: function(data) {
			infoStream = data;
			success(data);
		},
		error: function(data) {
			infoStream = data;
			error(data);
		}
	});
	return infoStream;
}

function addActivity(uid, auth, to_dl_id, from_dl_id, type, subject, link) {
	status = 0;
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
		success: success,
		error: error
	});
}

function success(data) {
	if(data != undefined && data.success != 0) {
		status = 1;
	} else {
		status = -1;
	}
}

function error(data) {
	status = data.status;
}

function getStatus() {
  return status;
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