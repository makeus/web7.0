document.addEventListener("DOMContentLoaded",function(){
    setupPage({bar:true});

    showRightForm(getURLParameter("type"));
    atachEvents();
    if(isToken()) {
        getStreamUrl(function(stream){
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
    
});

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
        }   
    });
}

function atachEvents(){
    $("#inputField").focus(function() {
        $("#form-hidden").show();
    });
    $("#close").click(function(){
        hideMessageFields();
    });
    $("#sendMessageBox").click(sendMessageClickEvent);
    $("#leftpanel img").load(function() {
        setLeftBarActiveLink();
    });
}

function getStreamUrl(done) {
    var type = getURLParameter("type");
    var dlid = getURLParameter("dlid");

    if(type == null) {
        type = "message";
    }
    if(dlid == null) {
        dlid = getDL_id();
    }
    getOtherStream(type,dlid,done);
}

function sendMessageClickEvent() {
    if(isToken()) {
        var subject = $("#inputField").val();

        if(subject == "") {
            return;
        }

        if(getURLParameter("type")=="cal") {
            saveTask(subject);
        } else if(getURLParameter("type")=="note"){
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

    addEvent(getURLParameter("dlid"), getDL_id(), subject, link, content, time_from, time_to, location, null, ccList, function(){
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
    addMessage(getURLParameter("dlid"), getDL_id(), subject, link, content, ccList, function(){
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
    addNote(getURLParameter("dlid"), getDL_id(), subject, content, deadline, ccList, function(){
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


function setLeftBarActiveLink(){
    var type = getURLParameter("type");

    switch(type) {
        case 'cal':
            $("#nameAndTypeBar p:last-child").text("Tasks & Events");
            $("#linklistleftTasks").addClass("active");
            break;
        case 'message':
            $("#nameAndTypeBar p:last-child").text("Messages");
            $("#linklistleftMessages").addClass("active");
            break;
        case 'note':
            $("#nameAndTypeBar p:last-child").text("To-Do Notes");
            $("#linklistleftNotes").addClass("active");
            break;
        default:
            $("#nameAndTypeBar p:last-child").text("Messages");
    }
}