var restUrl =  "https://www.dliv.in/rest/";
var status = 0;

var result;
function rest(opts,url, success, error){
	status = 0;
	result="";
	$.ajax(
	{
		url: restUrl+url,
		dataType: "json",
		global: false,
		async: false,
		data: opts,
		success: success,
		error: error
	});
	return result;
}



function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function addActivity(opts) {
	status = 0;
	$.ajax(
	{
		url: restUrl+"stream",
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