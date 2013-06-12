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
			sidebarsSetInfo(info);
			leftbarCreateLinks(dlid);
			rightbarCreateLinks(dlid);
		});
		
		jQuery( window ).on( "swiperight", function() {
			if($("#rightpanel").hasClass("ui-panel-closed")) {
				$( "#leftpanel" ).panel( "open" );
			}
		});
		jQuery( window ).on( "swipeleft", function() {
			if($("#leftpanel").hasClass("ui-panel-closed")) {
				$( "#rightpanel" ).panel( "open" );
			}
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


function getMessageInfo(id){
	var itemR= "";
	$.each(getSavedStream(),function(i,item){
		if(item.id==id){
			itemR=item;
		}
	});
	return itemR;
}

function getInfo(dl_id,done){
	var info = getInfoCache(dl_id);
	if(!info) {
	var opts={'dl_id':dl_id,'auth':getToken(),'uid':getDL_id()};
    var url="dlid"
    var info=rest(opts,url,
        function(data) {
            result = data;
            success(data);
            setInfoCache(data);
            done(data);
        },
        function(data) {
            result = data; 
            error(data);
            done(data);
        });
	} else {
		done(info);
	}
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
			done(data);
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
			done(data);
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
			done(data);
		});
}

function getUserArray(opts,done) {
	var arr = opts["dl_ids"].split(",");
	var cached  = new Array();

	$.grep(arr, function(item, i) {
		var info = getInfoCache(item);
		if(!info) {
			cached.push(info);
		}
		return info === false;
	});

	opts["dl_ids"] = arr.join();

	var url = "dlid";
    rest(opts, url, function(data) {
        result=data;
        success(data);
        $.each(data, function(i, item) {
        	setInfoCache(item);
        });
        data = data.concat(cached);
        done(data);
    },
    function(data) {
        result=data;
        error(data);
        done(data);
    });
}

function isToken() {
	return (getToken() != null) && (getToken() != undefined);
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}