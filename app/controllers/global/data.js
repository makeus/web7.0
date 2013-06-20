function setStatus(uusi) {
	status = uusi;
}
function getStatus() {
  return status;
}
var savedToken;
function saveToken(data){
	savedToken=data.authtoken;
}
function getToken(){
	return savedToken;
}
var savedDL_id;
function saveDL_id(data){
	savedDL_id=data.DL_id;
}

function getDL_id(){
	return savedDL_id;
}

var savedName;
function saveName(data){
	savedName=data.name;
}
function getName(){
	return savedName;
}
var savedStream=[];
function saveStream(data){
	savedStream=data;
}
function getSavedStream(){
	return savedStream;
}
function clearSavedStream(){
	savedStream=[];
}
var savedImg;
function saveImage(data){
	savedImg=data.img;
}
function getImage(){
	return savedImg;
}

var savedRelations;
function saveRelations(relations) {
	savedRelations = relations;
}

function getRelations() {
	return savedRelations;
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
	if (getRelation(getParameter("dlid")) !== null)
		return true;
	else
		return false;
}