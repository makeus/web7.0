(function(){
	var origiclick = jQuery.fn.click;

	jQuery.fn.click = function(e){
		origiclick.apply( this, arguments );
	}
})();

var theList;

$(document).ready(function(){
	setPageSwitcher();
	setAllBars();
    checkCurrentUser();
	setUpMaxWidth();
	setActionOnFooterClick();
	setActionOnHeaderClick();
});

function checkCurrentUser(){
	if(getCurrent() == undefined) {
		view.push("login");
	}
}

function setUpMaxWidth(){
	if(!isSteroids()) {
		$("*").css("max-width", "340px");
	}
}

function setAllBars(){
	$("#linklistleft").empty();
	$("#linklistright").empty();

	leftbarCreateLinks();
	setActionOnSwipeLeft();

	rightbarCreateLinks();
	setActionOnSwipeRight();

	bar.init();
}

function setActionOnFooterClick(){
	$("#index footer").click(function() {
		$.mobile.changePage( "#message", {transition: "none", changeHash: false , showLoadMsg: true, allowSamePageTransition: true});
	});
}

function setActionOnHeaderClick(){
	$("#message header a").click(function() {
		resetMessageFieldsEPage();
		$.mobile.changePage( "#index", {transition: "none", changeHash: false , showLoadMsg: true, allowSamePageTransition: true});
	});
}

function setActionOnSwipeRight(){
	jQuery( window ).on( "swiperight", function() {
		if(getCurrent()['name'] != 'login') {
			if($("#rightpanel").hasClass("ui-panel-closed")) {
				$( "#leftpanel" ).panel( "open" );
			}
		}
	});
}

function setActionOnSwipeLeft(){
	jQuery( window ).on( "swipeleft", function() {
		if(getCurrent()['name'] != 'login') {
			if($("#leftpanel").hasClass("ui-panel-closed")) {
				$( "#rightpanel" ).panel( "open" );
			}
		}
	});
}

function setPageSwitcher(){
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
		}
		appInit();
	});
}

function inMonths(diff){
	var one_month = 1000*60*60*24*30;
	var months = Math.floor(diff/one_month);
    if (months>=2){
    	return '' + months + ' ago';
    } else if (months>=1){
    	return 'one month ago';
    }
    return ''
}

function inDays(diff){
	var one_day = 1000*60*60*24;
	var days = Math.floor(diff/one_day);
    if (days>=2){
         return '' + days + ' days ago';
    } else if (days>=1) {
        return "one day ago";
    }
    return '';
}

function inWeeks(diff){
	var one_week = 1000*60*60*24*7;
	var weeks = Math.floor(diff/one_week);
    if (weeks>=2){
         return '' + weeks + ' weeks ago';
    } 
    return '';
}

function inHours(diff){
	var one_hour = 1000*60*60;
    var hours = Math.floor(diff/one_hour);
    var timeRemain = diff - (one_hour*hours);
    if (hours>=2) return '' + hours + " hours ago";
    if (hours>=1) return "one hour ago";

    return '';
}

function inMinutes(diff){
	var one_minute = 1000*60;
	var minutes = Math.floor(diff/one_minute);
	if (minutes>=2) return '' + minutes + ' minutes ago';
	if (minutes>=1) return 'one minute ago';
	return '0 minutes ago'; 
}

function getTimeDiffMili(sendedTime){
	var date = sendedTime.replace(/-/g, '/');    
    var d = new Date();
    var diff = Math.abs(d - new Date(date));   
	var n = d.getTimezoneOffset() * 1000 * 60;

	return (diff + n);
}

function getTimeDiff(sendedTime){
	var diff = getTimeDiffMili(sendedTime);
	
	var months = inMonths(diff);
	if (months !='') return months;
	
	var weeks = inWeeks(diff);
	if (weeks !='') return weeks;
	
	var days = inDays(diff);
	if (days !='') return days;
	 
	var hours = inHours(diff);
	if (hours != '') return hours;

	return inMinutes(diff);
}

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

		setActive(getParameter('type'));
	
		
		var streamType = getStreamType();
		showRightForm(streamType);
		attachEvents();

		document.addEventListener("menuButton", onMenuButton, false);
		document.addEventListener("backButton", onBackButton, false);

	}
}

var scroll_object;

function scrollerInit() {
    scroll_object = $("#scroller");
    scroll_object.iscrollview();
    $(document).delegate("div.iscroll-wrapper", "iscroll_onpulldown" , function() {
    	if(getCurrent().name == "frontpage") {
	        getOwnStream("message,cal,note", 0, function(stream) {
	            if(stream != null && stream != "") {
	                theList.html(stream.join('') );
	                scroll_object.iscrollview("refresh");
	                addLiListener();
	                offset=0;
	            }
	        });
	    }
	    if(getCurrent().name == "EPage") {
	        getStreamUrl(0, function(stream) {
	            if(stream != null && stream != "") {
	                theList.html(stream.join('') );
	                scroll_object.iscrollview("refresh");
	                addLiListener();
	                offset=0;
	            }
	        });

	    }
    });
    $(document).delegate("div.iscroll-wrapper", "iscroll_onpullup" , function() {
        appendStream();
    });	
}

function setEntityInformation(dlid){
		$("#nameAndTypeBar img").attr("src",dlid.img);	
}

function whenToLoadMore() {
	if($(theList).children().length < 15) {
        return false;
    }
    return scroll_object.iscrollview("y") - scroll_object.iscrollview("maxScrollY") < 100;
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
		done(info);
	}
}

var offset=0;
var intheend = false;
var onChange = false;

function appendStream(){


    if((!intheend) && (!onChange)) {

    	offset += 15;
        $("#thelist + div + img").show();
        onChange = true;
        getStreamUrl(offset,function(stream){
            if((stream.length < 1) || (!stream)) {
                intheend = true;
                $("#thelist + div + img").hide();
             } else {
                theList.append( stream.join('') );
                scroll_object.iscrollview("refresh");
                addLiListener(); 
            }
            onChange = false;
        });
    }
}



function addLiListener(){
	$(".listEL").off();
    $(".listEL").click(function(){
        var id = $(this).attr('id');
        var uid = $(this).attr('uid');
        var dlid = getParameter('dlid');
        var listElement= $(this);
        view.push("IPage", {'dlid':dlid, 'iPageID': id, 'uid': uid}); 
    });

    $(".listEL").mousedown(function() {
    	$(this).addClass("active");
    });

    $(".listEL").mouseup(function() {
    	$(this).removeClass("active");
    });
    $(".listEL").mouseout(function() {
    	$(this).removeClass("active");
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

function getInfo(dl_id,done,update){
	var info = getInfoCache(dl_id);
	if(!info || update) {
		var opts={'dl_id':dl_id,'auth':getToken(),'uid':getDL_id()};
	    var url="dlid"
	    rest(opts,url,
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
	if(settings.footer) {
		footer.show();
	} else {
		footer.hide();
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

function isSteroids() {
	if (navigator.userAgent.indexOf("AppGyverSteroids") !== -1)
		return true;
	else
		return false;
}
