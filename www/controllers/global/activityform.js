var types = ["event", "note", "message"];
var headers = ["New Task", "New To-Do Note", "New Message"];

function showRightForm(type){
    cleanAllForms()
    insertRightForm(type);
	changeHeadlin(type);
    insertCCList();
}

function cleanAllForms(){
    $("#not").hide();
    $("#cal").hide();
}


function changeHeadlin(type) {
    var header = $("#message header h1");
    header.text("New Message");
    $.each(types, function(i, item) {
        if(item == type) {
            header.text(headers[i]);
        }
    });
}


function insertRightForm(type){
    if(type=="event") {
		$("#cal").show();
    } else if(type=="note"){
		$("#not").show();
    }
}

function insertCCList(){
    getCCList(function(data) {
        if(data != undefined && data != "") {
            $("#ccForm").replaceWith("<div id='ccForm' data-role=\"collapsible\"><h2 class=\"ui-collapsible-heading\">CC</h2><ul id=\"cc\" data-role=\"listview\" data-filter=\"true\"></ul></div>");
            $("#cc").append(data.join(''));
        }   
        $("#ccForm").collapsible({refresh:true});
        setListenerToCCList();
    });
}

function setListenerToCCList(){
     $(".liCC").click(function(){
        if ($(this).attr('class')!='checkCC'){
            var checkID = $(this).attr('id');
            changeCheckedStatus(checkID);
        } 
    });
}

function changeCheckedStatus(checkID){
    if ($("#check_" + checkID).val(this).is(':checked')){
        $("#check_" + checkID).prop("checked", false);
        $("#p_" + checkID).css('font-weight', 'normal');
    } else {
        $("#check_" + checkID).prop("checked", true);
        $("#p_" + checkID).css('font-weight', 'bold');
    }
}

function attachEvents(){
    $("#sendMessagefooter").off();
    $("#sendMessagefooter").click(sendMessageFooterClickEvent);
}

function sendMessageFooterClickEvent() {
    if(isToken()) {
        var subject = $("#inputField").val();
        if(subject == "") {
            return;
        }
        if(getParameter("type")=="cal") {
            saveTask(subject);
        } else if(getParameter("type")=="note"){
            saveNote(subject);
        } else {
            saveMessage(subject);
        }

    } else {
        alert("UNAUTHORISED");
    }
}


function getSelectedCC() {
    var cc = [];
    $('input:checked').each(function() {
        cc.push($(this).val());
    });
    return cc.join();
}


function resetMessageFieldsEPage() {
    $("#message div input, #message div select, #message div textarea").val("");
}

function saveTask(subject){
    var link = $("#linkField").val();
    var content = $("#contentField").val();
    var time_from = ""+ $("#date_from").val() + " " + $("#time_from").val();
    var time_to = ""+ $("#date_to").val() + " " + $("#time_to").val();
    var location = $("location").val();
    var ccList = getSelectedCC();

    addEvent(getParameter("dlid"), getDL_id(), subject, link, content, time_from, time_to, location, null, ccList, function(){
        $.mobile.showPageLoadingMsg();
        setTimeout(function() {
            getStreamUrl(0, function(stream){
                $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
                resetMessageFieldsEPage();
                addLiListener();
                $.mobile.changePage("#index");
				$.mobile.hidePageLoadingMsg();
				
            });
        }, 2000);
    });
}

function saveMessage(subject){

    var link = $("#linkField").val();
    var content = $("#contentField").val();
    var ccList = getSelectedCC();
	var to_dl_id = getParameter("dlid");
	if((getCurrent().name == 'frontpage') || (!to_dl_id)) {
		to_dl_id = getDL_id();
	}
    addMessage(to_dl_id, getDL_id(), subject, link, content, ccList, function(){
        $.mobile.showPageLoadingMsg();
        setTimeout(function() {
            getStreamUrl(0, function(stream){
                $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
                resetMessageFieldsEPage();
                addLiListener();
                $.mobile.changePage("#index");
                $.mobile.hidePageLoadingMsg();
            });
        }, 2000);
    });
}

function saveNote(subject){  
    var privacy = $("#privacy").val();
    var deadline = ""+ $("#dDate").val() + " " + $("#dTime").val();  
    var ccList = getSelectedCC();
    var content = $("#additional").val();
    var ccList = getSelectedCC();

    addNote(getParameter("dlid"), getDL_id(), subject, content, deadline, ccList, function(){
        $.mobile.showPageLoadingMsg();
        setTimeout(function() {
            getStreamUrl(0, function(stream){
                $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
                resetMessageFieldsEPage();
                addLiListener();
                $.mobile.changePage("#index");
                $.mobile.hidePageLoadingMsg();
            });
        }, 2000);
    });
}

