var url =  "https://www.dliv.in/rest/";
var status = 0;

function pushView(name, page) {
	if (page == undefined)
		page = "index.html";

	if (isSteroids()) {
		var webView = new steroids.views.WebView("views/"+name+"/"+page);
		steroids.layers.push(webView);
	} else {
		window.location.href = "../"+name+"/"+page;
	}
}

function loginRest(username, password){
	status = 0;
	$.ajax(
	{
		url: url+"Authtoken",
		dataType: "json",
		global: false,
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
		global: false,
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

function addActivity(opts) {
	status = 0;
	$.ajax(
	{
		url: url+"stream",
		type: "POST",
		global: false,
		async: false,
		dataType: 'JSON', 
		data: opts,
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

function error(data, t, m) {
	if(t == "timeout") {
		alert("TIMEOUT");
	} else {
		alert("ERROR " + t + ": " + m);
	}
	status = data.status;
}

function getStatus() {
  return status;
}

function setStatus(uusi) {
	status = uusi;
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