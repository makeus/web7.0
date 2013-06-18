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



function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
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

function error(data, t, m) {
	if(t == "timeout") {
		alert("TIMEOUT");
	} else {
		console.log("ERROR " + t + ": " + m);
	}
	status = data.status;
}