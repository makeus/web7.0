document.addEventListener("DOMContentLoaded",function(){
	if(/login/i.test(window.location.pathname)) {
		localStorage.clear();
	}
	if(isToken()) {
		var dlid = getURLParameter("dlid");
		if(dlid == null) {
			dlid = getDL_id();
		}
		var info = getInfo(dlid);
		leftbarSetInfo(info);
		leftbarCreateLinks(dlid);

		jQuery( window ).on( "swiperight", function() {
			$( "#leftpanel" ).panel( "open" );
		});
	}
});


function addLiListener(){
    $(".listEL").click(function(){
        var id = $(this).attr('id');
        var listElement= $(this);
        view.push("IPage", "index.html?iPageID=" + id );
    });
}

function getMessageInfo(id){
	var opts = {'uid': getDL_id(), 'auth': getToken(), activity_id:id};
	var url = "stream";
	var item = rest(opts,url,function(data) {
			result = data;
			success(data);
		},
		function(data) {
			result = data;
			error(data);
		});
	return item;
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
	return (getToken() != null) && (getToken() != undefined);
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}