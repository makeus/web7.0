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
		async: true,
		data: opts,
		success: success,
		error: error
	});
	return result;
}

function addActivity(opts,success,error) {
	status = 0;
	$.ajax(
	{
		url: restUrl+"stream",
		type: "POST",
		global: false,
		async: true,
		dataType: 'JSON', 
		data: opts,
		success: success,
		error: error
	});
}
function addCommentRest(opts,url, success,error) {
	status = 0;
	$.ajax(
	{
		url: restUrl+url,
		type: "POST",
		global: false,
		async: true,
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

/*
* Näitä erroreita aiheuttavat ns. tarkoituksella mm. liian iso offset streamin haussa ja basic infon hakeminen
*/

function error(data, t, m) {
	if(t == "timeout") {
		alert("TIMEOUT");
	} 
	status = data.status;
}