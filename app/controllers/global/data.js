function setStatus(uusi) {
	status = uusi;
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

function saveName(data){
	localStorage.setItem('name',data.name);
}
function getName(){
	return localStorage.getItem('name');
}
function saveStream(data){
	localStorage.setItem('stream',JSON.stringify(data));
}
function getSavedStream(){
	return JSON.parse(localStorage.getItem('stream'));
}
function saveImage(url){
	localStorage.setItem('image',url);
}
function getImage(){
	return localStorage.getItem('image');
}

function saveRelations(relations) {
	localStorage.setItem('relations', JSON.stringify(relations));
}

function getRelations() {
	var relations = localStorage.getItem('relations');

	if (relations !== "")
		return $.parseJSON(relations);
	else
		return null;
}

function getRelation(dlid) {
	var relations = getRelations();

	if (relations !== null) {
		for (var i=0; i<relations.length; ++i) {
			if (relations[i].dlid === dlid) {
				return relations[i];
			}
		}
	}
	return null;
}

function isRelated() {
	if (getRelation(getURLParameter("dlid")) !== null)
		return true;
	else
		return false;
}