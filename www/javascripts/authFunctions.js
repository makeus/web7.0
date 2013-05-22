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
function login(username, password){
	localStorage.removeItem('authtoken');
	localStorage.removeItem('DL_id');
	loginRest(username, password);
}
function checkLogin(data){
	if(data.success!="0"){
		saveToken(data);
		saveDL_id(data);
	}
}