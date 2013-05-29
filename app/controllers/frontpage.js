document.addEventListener("DOMContentLoaded",function(){
    setPage({
        bar: true
    });

	$("#sendMessage").click(function() {
        if(isToken()) {
                var subject = $("#messageField")[0].value;
                var link = $("#linkField")[0].value;
                var content = $("#contentField")[0].value;

                addMessage(getDL_id(), getDL_id(), subject, link , content);

                var message = parseMessage(
                {
                    'from_DL_id': getDL_id(), 
                    'DL_id': getDL_id(), 
                    'to_DL_id': getDL_id(),
                    'subject': subject, 
                    'link': link, 
                    'content': content
                });

                resetMessageFields();

                $("#thelist").prepend(message);
        } else {
                alert("UNAUTHORISED");
        }
	});

    $("#messageField").focus(function() {
        $("#message-hidden").removeAttr("hidden");
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

function hideMessageFields() {
    $("#message-hidden").attr("hidden", "hidden");
}

function resetMessageFields() {
    $("#messageField")[0].value = "";
    $("#linkField")[0].value = "";
    $("#contentField")[0].value = "";
    hideMessageFields();
}
