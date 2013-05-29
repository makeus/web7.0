function setPage(settings) {
	if (settings === undefined)
		settings = {};
	
	// Default values
	if (settings.bar === undefined)
		settings.bar = false;


	if (settings.bar)
		bar.show();
	else
		bar.hide();
}



function getHistory(dl_id){
	var opts={'dl_id':dl_id,'auth':getToken(),'uid':getDL_id()};
	var url="gethistory";
	return rest(opts,url,
		function(data) {
			result = data;
			success(data);
		},
		function(data) {
			result = data;
			error(data);
		});
}
function search(searchWord){
	var opts={'q':searchWord,'auth':getToken(),'uid':getDL_id()};
	var url="search";
	return rest(opts,url,
		function(data) {
			result = data;
			success(data);
		},
		function(data) {
			result = data;
			error(data);
		});
}

function getActivityStream(opts) {
	var url = "stream";
	return rest(opts,url,function(data) {
			result = data;
			success(data);
		},
		function(data) {
			result = data;
			error(data);
		});
}


function isToken() {
	return getToken != 'null' && getToken != 'undefiend';
}