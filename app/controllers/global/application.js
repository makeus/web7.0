document.addEventListener("DOMContentLoaded",function(){
	$("#main").on('pageswitch', function(){
		console.log(getCurrent());
		switch(getCurrent()['name']) {
			case "login":
				initlogin();
				break;
			case "frontpage":
				initfrontpage();
				break;
			case "BPage":
				initBPage();
				break;
			case "EPage":
				initEPage();
				break;
			case "IPage":
				initIPage();
				break;
			case "RPage":
				initRPage();
				break;
			case "search":
				initsearch();
				break;
			default:
				console.log("default initiated");
		}
		appInit();
	});

	if(getCurrent() == undefined) {
		view.push("login");
	}

	if(!isSteroids()) {
		$("*").css("max-width", "340px");
	}


});

function appInit(){
	if(isToken()) {
		var dlid = getURLParameter("dlid");
		if(dlid == null) {
			dlid = getDL_id();
		}

		getInfo(dlid,function(info){
			$("#linklistleft").empty();
			$("#linklistright").empty();

			sidebarsSetInfo(info);
			leftbarCreateLinks(dlid);
			rightbarCreateLinks(dlid);
			setEntityInformation(info);
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
}



function setEntityInformation(dlid){
		$("#nameAndTypeBar img").attr("src",dlid.img);	
}

function getUserData(dlid,done, error){
	var info = getUserDataCache(dlid);
	if(!info) {
		var opts={'dl_id':dlid,'auth':getToken(),'uid':getDL_id(),'table_name':"dl_user"};
    	var url="dliddata";
    	rest(opts,url,
        function(data) {
            result = data;
            success(data);
            setUserDataCache(data);
            done(data);
        },
        error);
	} else {
		//console.log("rtrtrtrtr");
		done(info);
	}
}

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
		success(info);
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

	if (settings.barBackButton){
		bar.showBackButton();
	}else{
		bar.hideBackButton();
	}
	if(settings.searchPage){
		bar.showSearch();
	}else{
		bar.hideSearch();
	}
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
			console.log(data);
			error(data);
			done(data);
		});
}

function setActivityCompleted(completed, done) {
    if (completed === false){
    	var opts = {'uid':getDL_id(),'auth':getToken(),'dl_id':getURLParameter("uid"),'activity_id':getURLParameter("iPageID"),'remove':"1"};
    	remove = "&remove=1";
    }else {
    	var opts = {'uid':getDL_id(),'auth':getToken(),'dl_id':getURLParameter("uid"),'activity_id':getURLParameter("iPageID")};
    }
    
    var url = "setactivitycompleted";
    
    rest(opts,
        url,
        function(data) {
			success(data);
			if (done != null)
				done(data);
		},
		function(data) {
			error(data);
			if (done != null)
				done(data);
		});
}

function getUserArray(dlids,done) {
	var opts = {'uid': getDL_id(), 'auth':getToken(), 'dl_ids':dlids};
	var arr = dlids.split(",");
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




// function downloadFile(dlUrl){
//         window.requestFileSystem(
//                      LocalFileSystem.PERSISTENT, 0, 
//                      function onFileSystemSuccess(fileSystem) {
//                      	        	alert("1");

//                      fileSystem.root.getFile(
//                                  "dummy.html", {create: true, exclusive: false}, 
//                                  function gotFileEntry(fileEntry){
//                                  	                     	        	alert("2");

//                                  var sPath = fileEntry.fullPath.replace("dummy.html","");
//                                  var fileTransfer = new FileTransfer();
//                                  fileEntry.remove();
//  								alert("5");
//                                  fileTransfer.download(
//                                            encodeURI(dlUrl),
//                                            sPath + "theFile"+dlUrl.slice(-4),
//                                            function(theFile) {
//                                            	                     	        	alert("3");

//                                            console.log("download complete: " + theFile.toURI());
//                                            saveImage(theFile.toURI());
//                                            alert(theFile.toURI());
//                                            },
//                                            function(error) {
//                                            	                     	        	alert("4");

//                                            console.log("download error source " + error.source);
//                                            console.log("download error target " + error.target);
//                                            console.log("upload error code: " + error.code);
//                                            },true
//                                            );
//                                  });
//                      });
 
//     }
