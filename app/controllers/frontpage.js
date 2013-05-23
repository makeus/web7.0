document.addEventListener("DOMContentLoaded",function(){
	$("#sendMessage").hammer().on("tap", function() {
		addMessage(getDL_id(), getDL_id(), $("#messageField")[0].value, "");
	});
});

var status = 0;

function addMessage(to_dl_id, from_dl_id, subject, link) {
	if(to_dl_id == null || from_dl_id == null || subject == null) {
		return -1;
	}
	var uid = getDL_id();
	var auth = getToken();
	var type = "message";
	addActivity(uid, auth, to_dl_id, from_dl_id, type, subject, link);
	return status;
}

function successActivity(data) {
	return status = 1;
}

function failActivity(data) {
	status = data.status;
}