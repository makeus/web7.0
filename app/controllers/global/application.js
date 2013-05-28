function getHistory(own_id, dl_id,authToken){
	var opts={'dl_id':dl_id,'auth':authToken,'uid':own_id};
	return getHistoryRest(opts);
}
