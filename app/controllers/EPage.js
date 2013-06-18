
function initEPage() {
    setupPage({
        bar: true,
        barBackButton: false
    });


    var scrollTimer = 0;

    $(window).scroll(function () {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function(){
            if($(window).scrollTop() + $(window).height() > $(document).height() - 500) {
                appendStreamE();
            }
        }, 100);
    });
    
    showRightForm(getParameter("type"));
    attachEvents();
    if(isToken()) {
        getStreamUrl(offset,function(stream){
            if(stream != null && stream != "") {
                $("#thelist").append( stream.join('') );
                addLiListener();
            }
        });
    } else {
        alert("UNAUTHORISED");
    }

    if($("#entityImg").width() == 200) {
        $("#entityImg").css('margin-left', '-100px');
    }
}

var offset=0;
function appendStreamE(){
    offset += 15;
    getStreamUrl(offset,function(stream){
        if(stream != null && stream != "") {
            $("#thelist").append( stream.join('') );
            addLiListener();
         }
    });
}

function showRightForm(type){
    if(type=="cal") {
        $("#message").replaceWith($("#cal").show());
        $("#msg").remove();
        $("#not").remove();
    } else if(type=="note"){
        $("#message").replaceWith($("#not").show());
        $("#cal").remove();
        $("#msg").remove();
    } else {
        $("#message").replaceWith($("#msg").show());
        $("#cal").remove();
        $("#not").remove();
    }
    
    getCCList(function(data) {
        if(data != undefined && data != "") {
            $("#cc").append(data.join(''));
			$("#cc").listview().listview("refresh");
        }   
    });
}

function attachEvents(){
    $("#inputField").focus(function() {
        $("#form-hidden").show();
    });
    $("#close").click(function(){
        hideMessageFields();
    });
    $("#sendMessageBox").click(sendMessageClickEvent);
}

function getStreamUrl(offset,done) {
    var type = getParameter("type");
    var dlid = getParameter("dlid");

    if(type == null) {
        type = "message";
    }
    if(dlid == null) {
        dlid = getDL_id();
    }
    getOtherStream(type,dlid,offset,done);
}

function sendMessageClickEvent() {
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
        getStreamUrl(function(stream){
            $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
            resetMessageFields();
            addLiListener();
        });
    });
}

function saveMessage(subject){
    var link = $("#linkField").val();
    var content = $("#contentField").val();
    var ccList = getSelectedCC();
    addMessage(getParameter("dlid"), getDL_id(), subject, link, content, ccList, function(){
        getStreamUrl(function(stream){
            $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
            resetMessageFields();
            addLiListener();
        });
    });
}

function saveNote(subject){  
    var privacy = $("#privacy").val();
    var deadline = ""+ $("#dDate").val() + " " + $("#dTime").val();  
    var ccList = getSelectedCC();
    var content = $("#additional").val();
    var ccList = getSelectedCC();
    addNote(getParameter("dlid"), getDL_id(), subject, content, deadline, ccList, function(){
        getStreamUrl(function(stream){
            $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
            resetMessageFields();
            addLiListener();
        });
    });
}

function getSelectedCC() {
    var cc = [];
    $('input:checked').each(function() {
        cc.push($(this).val());
    });
    return cc.join();
}

function hideMessageFields() {
    $("#form-hidden").hide();
}

function resetMessageFields() {
    $("#inputField").val("");
    $("#linkField").val("");
    $("#contentField").val("");
    $("#time_from").val("");
    $("#time_to").val("");
    $("#location").val("");
    $("#additional").val("");
    $("#date_to").val("");
    hideMessageFields();
}
