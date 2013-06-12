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
            done(data);
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
	var url = "dlid";
    rest(opts, url, function(data) {
        result=data;
        success(data);
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