document.addEventListener("DOMContentLoaded",function(){
	$("#sendMessage").click(sendMessageClickEvent);
    $("#sendMessageBox").click(sendMessageClickEvent);

    setPage({
        bar: true
    });

    

    $("#messageField").focus(function() {
        $("#message-hidden").show();
    });

    $("#close").click(function(){
        hideMessageFields();
    });

    if(isToken()) {
        var stream=getStream('message,cal,note');
        info = getInfo(getDL_id());
        $("#appTitle").text(info.name);
        $("#thelist").append(stream.join('') );
        $("li").click(function(){
            var id = $(this).attr('id');
            var listElement= $(this);
            var src= $(this).find('img').attr("src");
            view.push("IPage", "index.html?iPageID=" + id + "&src=" + src);
            return false; 
        });

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

                var stream=getStream('message,cal,note');
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
    hideMessageFields();
}




