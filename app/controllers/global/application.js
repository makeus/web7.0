$(document).on('pageinit', function(){

	$("#main").on('pageswitch', function(){
		$("#main *").off(); 
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

	$("#linklistleft").empty();
	$("#linklistright").empty();

	leftbarCreateLinks();
	rightbarCreateLinks();
	
	bar.initListeners();
	

	if(getCurrent() == undefined) {
		view.push("login");
	}

	if(!isSteroids()) {
		$("*").css("max-width", "340px");
	}

});

function onBackButton(){
	view.pop();
}
function onMenuButton(){
	if($("#settingsList").css("display")=="table")
		bar.hideSettingsList();
	else{
		bar.showSettingsList();
	}

}

function appInit(){

	if(isToken()) {
		
		var	dlid = getParameter('dlid');

		if (dlid==undefined){
			dlid = getDL_id();
		}
		getInfo(dlid,function(info){

			sidebarsSetInfo(info);
			updateUrls(dlid);
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

		setActive(getParameter('type'));

		/*var scrollTimer = 0;
		$(window).scroll(function () {
	        if (scrollTimer) {
	            clearTimeout(scrollTimer);
	        }
	        scrollTimer = setTimeout(function(){
	            if($(window).scrollTop() + $(window).height() > $(document).height() - 500) {
	            	if(getCurrent().name == "frontpage") {
	            		appendStreamF();
	            	}
	            	if(getCurrent().name == "EPage") {
	            		appendStreamE();
	            	}
	                
	            }
	        }, 100);
    	});*/
		document.addEventListener("menuButton", onMenuButton, false);
		document.addEventListener("backButton", onBackButton, false);
	}
}

function scrollerInit() {
    $("#scroller").iscrollview();
    $(document).delegate("div.iscroll-wrapper", "iscroll_onpulldown" , function() {
        refreshStream("message,cal,note", function(stream) {
            if(stream != null && stream != "") {
                $("#thelist").html(stream.join('') );
                $("#scroller").iscrollview("refresh");
                addLiListener();
            }
        });
    });
    $(document).delegate("div.iscroll-wrapper", "iscroll_onpullup" , function() {
        appendStreamF();
        $("#scroller").iscrollview("refresh");
    });
    $("#scroller").iscrollview("refresh"); 	
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
        view.push("IPage", {'iPageID': id, 'uid': uid});  		//view.push("IPage", "index.html?iPageID=" + id +"&uid=" + uid);
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
			error(data);
			done(data);
		});
}

function setActivityCompleted(completed, done) {
    if (completed === false){
    	var opts = {'uid':getDL_id(),'auth':getToken(),'dl_id':getParameter("uid"),'activity_id':getParameter("iPageID"),'remove':"1"};
    	remove = "&remove=1";
    }else {
    	var opts = {'uid':getDL_id(),'auth':getToken(),'dl_id':getParameter("uid"),'activity_id':getParameter("iPageID")};
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
		}
	);
}

function createRelation(dl_id_from, dl_id_to, role, done) {
	if (dl_id_from == null || dl_id_from === "me")
		dl_id_from = getDL_id();

	if (role == null)
		role = "";


	var url = "addrelation";

	var opts = {
		'uid': getDL_id(),
		'auth': getToken(),
		'dl_id_from': dl_id_from,
		'dl_id_to': dl_id_to,
		'role': role
	};

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
		}
	);
}

function getUserArray(dlids,done) {
	var opts = {'uid': getDL_id(), 'auth':getToken(), 'dl_ids':dlids};
	var arr = dlids.split(",");
	arr = $.unique(arr);
	var cached  = new Array();

	arr = $.grep(arr, function(item, i) {
		var info = getInfoCache(item);
		if(info == undefined) {
			info == false;
		}
		
		if(info !== false) {
			cached.push(info);
		}
		return (info == false);
	});

	if(arr.length !== 0) {
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
	} else {
		done(cached);
	}
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
