document.addEventListener("DOMContentLoaded",function(){
    setupPage({
        bar:true
    });


    if(getURLParameter("type")=="cal") {
        $("#message").replaceWith($("#cal").show());
        $("#msg").remove();
    }
    else {
        $("#message").replaceWith($("#msg").show());
        $("#cal").remove();
    }
    $("#sendMessage").click(sendMessageClickEvent);
    $("#sendMessageBox").click(sendMessageClickEvent);

    setEntityInformation(getURLParameter("dlid"));
    setLeftBarActiveLink();

    if(isToken()) {
        getStreamUrl(function(stream){
            if(stream != "") {
            $("#thelist").append( stream.join('') );
        }

        
        });
    } else {
        alert("UNAUTHORISED");
    }

    $("#messageField").focus(function() {
        $("#message-hidden").show();
    });

    $("#close").click(function(){
        hideMessageFields();
    });

    if($("#entityImg").width() == 200) {
        $("#entityImg").css('margin-left', '-100px');
    }
    addLiListener();

});


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
                var subject = $("#messageField").val();
                var link = $("#linkField").val();
                var content = $("#contentField").val();
                var time_from = ""+ $("#date_from").val() + " " + $("#time_from").val();
                var time_to = ""+ $("#date_to").val() + " " + $("#date_from").val();
                var location = $("location").val();

                if(subject == "") {
                    return;
                }

                if(getURLParameter("type")=="cal") {
                    addEvent(getURLParameter("dlid"), getDL_id(), subject, link, content, time_from, time_to, location,null,function(){
                        getStreamUrl(function(stream){
                            $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
                            resetMessageFields();
                 });
                    });
                }
                else {
                    addMessage(getURLParameter("dlid"), getDL_id(), subject, link, content,function(){
                        getStreamUrl(function(stream){
                            $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
                            resetMessageFields();
                 });
                    });
                }

                 
                
        } else {
                alert("UNAUTHORISED");
        }
}


function hideMessageFields() {
    $("#message-hidden").hide();
}

function resetMessageFields() {
    $("#messageField").val("");
    $("#linkField").val("");
    $("#contentField").val("");
    $("#time_from").val("");
    $("#time_to").val("");
    $("#location").val("");
    hideMessageFields();
}


function setEntityInformation(dl_id){
    getInfo(dl_id,function(info){
        var image = "";
    if(info.img == "") {
        image = '../../resources/images/tyhja.png';
    } else {
        image = info.img
    }
    $("#entityImg").attr('src',image);
    $("#entityImg").attr('alt',info.name);
    $("#entityRole").text($("#leftbar_role").text());
    $("#entityName").text($("#leftbar_name").text());
    });

    
}

function setLeftBarActiveLink(){
    var type = getURLParameter("type");

    switch(type) {
        case 'cal':
            $("#entityStreamType").text("Tasks & Events");
            $("#linklistTasks").addClass("active");
            break;
        case 'message':
            $("#entityStreamType").text("Messages");
            $("#linklistMessages").addClass("active");
            break;
        default:
            $("#entityStreamType").text("Messages");
    }



}