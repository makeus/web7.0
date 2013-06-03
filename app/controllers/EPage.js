document.addEventListener("DOMContentLoaded",function(){
    setPage({
        bar:true
    });
    $("#sendMessage").click(sendMessageClickEvent);
    $("#sendMessageBox").click(sendMessageClickEvent);

    setEntityInformation(getURLParameter("dlid"));
    if(isToken()) {
        var stream=getStream('message',getURLParameter("dlid"));

        if(stream == "") {
            $("#message").hide();
        }

        $("#thelist").append( stream.join('') );
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

});


function sendMessageClickEvent() {
        if(isToken()) {
                var subject = $("#messageField").val();
                var link = $("#linkField").val();
                var content = $("#contentField").val();

                if(subject == "") {
                    return;
                }

                addMessage(getURLParameter("dlid"), getDL_id(), subject, link, content);

                 var stream=getStream('message',getURLParameter("dlid"));
                $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");


                resetMessageFields();

                $("#thelist").prepend(message);
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
    hideMessageFields();
}


function setEntityInformation(dl_id){
    var info=getEntityInformation(dl_id);
    var image = "";
    if(info.img == "") {
        image = '../../resources/images/tyhja.png';
    } else {
        image = info.img
    }
    $("#entityImg").attr('src',image);
    $("#entityImg").attr('alt',info.name);
    $("#entityRole").text(info.type);
    $("#entityName").text(info.name);
}