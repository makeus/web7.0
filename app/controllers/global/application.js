function getHistory(dl_id){
	var opts={'dl_id':dl_id,'auth':getToken(),'uid':getDL_id()};
	return getHistoryRest(opts);
}
function search(searchWord){
	var opts={'q':searchWord,'auth':getToken(),'uid':getDL_id()};
	return searchRest(opts);
}

function isToken() {
	return getToken != 'null' && getToken != 'undefiend';
}