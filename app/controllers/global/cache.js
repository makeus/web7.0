function getCache(cachename) {
	cache = JSON.parse(localStorage.getItem(cachename));
		if(cache == undefined) {
			cache = {};
		}
	return cache;
}

function setCache(cachename, item) {
	localStorage.setItem(cachename,JSON.stringify(item));
}

var usercache;

function getInfoCache(id) {
	if(usercache == undefined) {
		usercache = getCache("usercache");
	}
	if(!(id in usercache)) {
		return false;
	}
	return usercache[id];
}

function setInfoCache(info) {
	if(usercache == undefined) {
		usercache = getCache("usercache");
	}
	usercache[info.DL_id] = info;
	setCache("usercache", usercache);
}

var userdatacache;

function getUserDataCache(dlid) {
	if(userdatacache == undefined) {
		userdatacache = getCache("userdatacache");
	}
	if(!(dlid in userdatacache)) {
		return false;
	}
	return userdatacache[dlid];
}
function setUserDataCache(info) {
	if(userdatacache == undefined) {
		userdatacache = getCache("userdatacache");
	}
	userdatacache[info.DL_id] = info;
	setCache("userdatacache", userdatacache);
}