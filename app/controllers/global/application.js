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

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
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

function getUserArray(opts) {
	var url = "dlid";
    return rest(opts, url, function(data) {
        result=data;
        success(data);
    },
    function(data) {
        result=data;
        error(data);
    });
}



function isToken() {
	return getToken != 'null' && getToken != 'undefiend';
}