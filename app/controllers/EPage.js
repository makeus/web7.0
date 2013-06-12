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
    } else if(type=="message"){
        $("#message").replaceWith($("#msg").show());
        $("#cal").remove();
        $("#not").remove();
    } else {
        $("#message").replaceWith($("#not").show());
        $("#cal").remove();
        $("#msg").remove();
    }
}

function atachEvents(){
    $("#inputField").focus(function() {
        $("#form-hidden").show();
    });
    $("#close").click(function(){
        hideMessageFields();
    });
    $("#sendMessage").click(sendMessageClickEvent);
    $("#sendMessageBox").click(sendMessageClickEvent);
    $("#leftpanel img").load(function() {
        setEntityInformation();
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
        } else if(getURLParameter("type")=="message"){
            saveMessage(subject);
        } else {
            saveNote(subject);
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

    addEvent(getURLParameter("dlid"), getDL_id(), subject, link, content, time_from, time_to, location,null,function(){
        getStreamUrl(function(stream){
            $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
            resetMessageFields();
            addLiListener();
        });
    });
}

function saveMessage(subject){
    var privacy = $("#linkField").val();
    var link = $("#linkField").val();
    var content = $("#contentField").val();
    addMessage(getURLParameter("dlid"), getDL_id(), subject, link, content,function(){
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
    //var ccList = .....
    var content = $("#additional").val();
    addNote(getURLParameter("dlid"), getDL_id(), subject, content, deadline,function(){
        getStreamUrl(function(stream){
            $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
            resetMessageFields();
            addLiListener();
        });
    });
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
    $("#cclist").val("");
    $("#date_to").val("");
    hideMessageFields();
}

function setEntityInformation(){
    $("#entityRole").text($("#leftpanel .bar_role").text());
    $("#entityName").text($("#leftpanel .bar_name").text());
}

function setLeftBarActiveLink(){
    var type = getURLParameter("type");

    switch(type) {
        case 'cal':
            $("#entityStreamType").text("Tasks & Events");
            $("#linklistleftTasks").addClass("active");
            break;
        case 'message':
            $("#entityStreamType").text("Messages");
            $("#linklistleftMessages").addClass("active");
            break;
        case 'note':
            $("#entityStreamType").text("To-Do Notes");
            $("#linklistleftNotes").addClass("active");
            break;
        default:
            $("#entityStreamType").text("Messages");
    }
}