
function initEPage() {
    clearSavedStream();
    setupPage({
        bar: true,
        barBackButton: false
    });

    var streamType = getStreamType();
    showRightForm(streamType);
    attachEvents();
    if(isToken()) {
        getStreamUrl(0,function(stream){
            if(stream != null && stream != "") {
                $("#thelist").append( stream.join('') );
                addLiListener();
            } else {
                $("#thelist").append('<h3>The stream is empty</h3><h3>no ' + streamType + 's were found!</h3>');
            }
            $("#thelist+img").hide();
        });
    } else {
        alert("UNAUTHORISED");
    }

    if($("#entityImg").width() == 200) {
        $("#entityImg").css('margin-left', '-100px');
    }

    offset = 0;
    intheend = false;
}

var offset=0;
var intheend = false;

function getStreamType(){
    var t = getParameter('type');
    if (t==undefined){
        return 'message';
    } 
    if (t=='cal'){
        return 'event';
    }
    return t;
}

function appendStreamE(){
    offset += 15;
    if(!intheend) {
        $("#thelist+img").show();
        getStreamUrl(offset,function(stream){
            if((stream.length < 1) || (!stream)) {
                intheend = true;
                $("#thelist+img").hide();
             } else {
                $("#thelist").append( stream.join('') );
                addLiListener();
            }
        });
    }
}

function showRightForm(type){
    cleanAllForms()
    insertRightForm(type);
    insertCCList();
}

function insertRightForm(type){
    if(type=="event") {
        $("#message").replaceWith($("#cal").show());
    } else if(type=="note"){
        $("#message").replaceWith($("#not").show());
    } else {
        $("#message").replaceWith($("#msg").show());
    }
}

function cleanAllForms(){
    $("#not").hide();
    $("#cal").hide();
    $("#msg").hide();
}

function insertCCList(){
    getCCList(function(data) {
        if(data != undefined && data != "") {
            $("#cc").append(data.join(''));
            $("#cc").listview().listview("refresh");
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
    $("#inputField").focus(function() {
        $("#form-hidden").show();
    });
    $("#close").click(function(){
        $("#form-hidden").hide();
    });
    $("#sendMessageBox").click(sendMessageClickEventEPage);
}

function getStreamUrl(offset,done) {
    var type = getParameter("type");
    var dlid = getParameter("dlid");

    if(type == undefined) {
        type = "message";
    }
    if(dlid == undefined) {
        dlid = getDL_id();
    }
    getOtherStream(type,dlid,offset,done);
}

function sendMessageClickEventEPage() {
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
                $.mobile.hidePageLoadingMsg();
            });
        }, 2000);
    });
}

function saveMessage(subject){
    var link = $("#linkField").val();
    var content = $("#contentField").val();
    var ccList = getSelectedCC();
    addMessage(getParameter("dlid"), getDL_id(), subject, link, content, ccList, function(){
        $.mobile.showPageLoadingMsg();
        setTimeout(function() {
            getStreamUrl(0, function(stream){
                $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
                resetMessageFieldsEPage();
                addLiListener();
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
                $.mobile.hidePageLoadingMsg();
            });
        }, 2000);
    });
}

function getSelectedCC() {
    var cc = [];
    $('input:checked').each(function() {
        cc.push($(this).val());
    });
    return cc.join();
}


function resetMessageFieldsEPage() {
    $("#inputField").val("");
    $("#linkField").val("");
    $("#contentField").val("");
    $("#time_from").val("");
    $("#time_to").val("");
    $("#location").val("");
    $("#additional").val("");
    $("#date_to").val("");
    $("#form-hidden").hide();
}