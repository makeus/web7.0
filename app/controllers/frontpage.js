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

    if(isToken()) {
        var stream=getStream('message,cal,note');
        info = getInfo(getDL_id());
        $("#appTitle").text(info.name);
        $("#thelist").append( stream.join('') );

    } else {
        alert("UNAUTHORISED");
    }
});

function getInfo(dl_id){
    var opts={'dl_id':dl_id,'auth':getToken(),'uid':getDL_id()};
    var url="dlid"
    var info=rest(opts,url,
        function(data) {
            result = data;
            success(data);
        },
        function(data) {
            result = data; 
            error(data);
        });
    return info;
}

function sendMessageClickEvent() {
        if(isToken()) {
                var subject = $("#messageField").val();
                var link = $("#linkField").val();

                if(subject == "") {
                    return;
                }

                addMessage(getDL_id(), getDL_id(), subject, link);

                var stream=getStream('message,cal,note');
                $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");


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
    $("#messageField").val("");
    $("#linkField").val("");
    hideMessageFields();
}
