
var usercache;

function getInfoCache(id) {
	if(usercache == undefined) {
		usercache = {};
	}
	if(!(id in usercache)) {
		return false;
	}
	return usercache[id];
}

function setInfoCache(info) {
	if(usercache == undefined) {
		usercache = {};
	}
	usercache[info.DL_id] = info;
}

var userdatacache;

function getUserDataCache(dlid) {
	if(userdatacache == undefined) {
		userdatacache = {};
	}
	if(!(dlid in userdatacache)) {
		return false;
	}
	return userdatacache[dlid];
}
function setUserDataCache(info) {
	if(userdatacache == undefined) {
		userdatacache = {};
	}
	userdatacache[info.DL_id] = info;
}