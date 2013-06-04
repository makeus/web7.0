function addLiListener(){
    $("li").click(function(){
            var id = $(this).attr('id');
            var listElement= $(this);
            var src= $(this).find('img').attr("src");
            view.push("IPage", "index.html?iPageID=" + id + "&src=" + src);
            return false; 
        });
}


function getMessageInfo(id){
	var opts = {'uid': getDL_id(), 'auth': getToken(), 'offset': 0, 'limit': 100, 'types': 'cal,message,note', 'stream': true, 'dlid':getDL_id()};
	var url = "stream";
	var items = rest(opts,url,function(data) {
			result = data;
			success(data);
		},
		function(data) {
			result = data;
			error(data);
		});
	var value;
	$.each(items,function(i,item){
		if(item.id==id){
			value=item;
		}
	});
	return value;
}

function getInfo(dl_id){
    var opts={'dl_id':dl_id,'auth':getToken(),'uid':getDL_id()};
    var url="dlid"
    var info=rest(opts,url,
        function(data) {
            result = data;
            success(data);
        },
        function(data) {
            result = data; 
            error(data);
        });
    return info;
}



function setupPage(settings) {
	if (settings === undefined)
		settings = {};

	if (settings.bar)
		bar.show();
	else
		bar.hide();

	if (settings.barBackButton)
		bar.showBackButton();
}



function getHistory(){
	var opts={'dl_id':getDL_id(),'auth':getToken(),'uid':getDL_id()};
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

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}