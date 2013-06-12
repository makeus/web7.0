document.addEventListener("DOMContentLoaded",function(){
	$("#sendMessage").click(sendMessageClickEvent);
    $("#sendMessageBox").click(sendMessageClickEvent);

    setupPage({
        bar: true
    });

    $("#messageField").focus(function() {
        $("#message-hidden").show();
    });

    $("#close").click(function(){
        hideMessageFields();
    });

    $("#showMessages").click(function(){
        showMessages(function(data){
                addLiListener();
        });
    });

    if(isToken()) {
        getOwnStream('message,cal,note',function(stream){
            $("#appTitle").text(getName());
            $("#thelist").append(stream.join(''));
            addLiListener();
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

        addMessage(getDL_id(), getDL_id(), subject, link,null,function(){
            getOwnStream('message,cal,note',function(stream){
                $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
                resetMessageFields();
                addLiListener();
            });
        });
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




