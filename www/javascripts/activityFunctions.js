function addMessage(to_dl_id, from_dl_id, subject, link) {
	var uid = getDL_id();
	var auth = getToken();
	var type = "message";
	addActivity(uid, auth, to_dl_id, from_dl_id, type, subject, link);
}