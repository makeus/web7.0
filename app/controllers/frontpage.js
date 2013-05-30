document.addEventListener("DOMContentLoaded",function(){
	$("#sendMessage").click(sendMessageClickEvent);
    $("#sendMessageBox").click(sendMessageClickEvent);

    setPage({
        bar: true
    });

    $("#messageField").focus(function() {
        $("#message-hidden").removeAttr("hidden");
    });

    $("#close").click(function(){
        hideMessageFields();
    });

    /*$("#formi").focusout(function() {
        hideMessageFields();
    });*/

    if(isToken()) {
        var stream=getStream('message,cal,note');
        $("#thelist").append( stream.join('') );
    } else {
        alert("UNAUTHORISED");
    }
});

function sendMessageClickEvent() {
        if(isToken()) {
                var subject = $("#messageField").val();
                var link = $("#linkField").val();

                if(subject == "") {
                    return;
                }

                addMessage(getDL_id(), getDL_id(), subject, link);

                var message = parseMessage(
                {
                    'from_DL_id': getDL_id(), 
                    'DL_id': getDL_id(), 
                    'to_DL_id': getDL_id(),
                    'subject': subject, 
                    'link': link
                });

                resetMessageFields();

                $("#thelist").prepend(message);
        } else {
                alert("UNAUTHORISED");
        }
}

function hideMessageFields() {
    $("#message-hidden").attr("hidden", "hidden");
}

function resetMessageFields() {
    $("#messageField")[0].value = "";
    $("#linkField")[0].value = "";
    hideMessageFields();
}
