document.addEventListener("DOMContentLoaded",function(){

	if(/login/i.test(window.location.pathname)) {
		localStorage.clear();
	}
	if(isToken()) {
		var dlid = getURLParameter("dlid");
		if(dlid == null) {
			dlid = getDL_id();
		}
		getInfo(dlid,function(info){
			leftbarSetInfo(info);
			leftbarCreateLinks(dlid);

		});
		
		jQuery( window ).on( "swiperight", function() {
			$( "#leftpanel" ).panel( "open" );
		});
	}
});


function addLiListener(){
    $(".listEL").click(function(){
        var id = $(this).attr('id');
        var uid = $(this).attr('uid');
        var listElement= $(this);
        view.push("IPage", "index.html?iPageID=" + id +"&uid=" + uid);
    });
}


function getMessageInfo(id,done){
	var opts = {'uid': getDL_id(), 'auth': getToken(), activity_id:id};
	var url = "stream";
	rest(opts,url,function(data) {
			result = data;
			success(data);
			done(data);
		},
		function(data) {
			result = data;
			error(data);
		});
}

function getInfo(dl_id,done){
    var opts={'dl_id':dl_id,'auth':getToken(),'uid':getDL_id()};
    var url="dlid"
    var info=rest(opts,url,
        function(data) {
            result = data;
            success(data);
            done(data);
        },
        function(data) {
            result = data; 
            error(data);
        });
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



function getHistory(done){
	var opts={'dl_id':getDL_id(),'auth':getToken(),'uid':getDL_id()};
	var url="gethistory";
	rest(opts,url,
		function(data) {
			result = data;
			success(data);
			done(data);
		},
		function(data) {
			result = data;
			error(data);
		});
}


function search(searchWord,done){
	var opts={'q':searchWord,'auth':getToken(),'uid':getDL_id()};
	var url="search";
	return rest(opts,url,
		function(data) {
			result = data;
			success(data);
			done(data);
		},
		function(data) {
			result = data;
			error(data);
		});
}

function getActivityStream(opts,done) {
	var url = "stream";
	rest(opts,url,function(data) {
			result = data;
			success(data);
			done(data);
		},
		function(data) {
			result = data;
			error(data);
		});
}

function getUserArray(opts,done) {
	var url = "dlid";
    rest(opts, url, function(data) {
        result=data;
        success(data);
        done(data);
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