document.addEventListener("DOMContentLoaded",function(){
    setEntityInformation(getURLParameter("dlid"));
    $("#sendMessage").click(sendMessageClickEvent);
    $("#sendMessageBox").click(sendMessageClickEvent);

    console.log(getURLParameter("dlid"));
    if(isToken()) {
        var stream=getStream('message',getURLParameter("dlid"));
        $("#thelist").append( stream.join('') );
    } else {
        alert("UNAUTHORISED");
    }

    $("#messageField").focus(function() {
        $("#message-hidden").removeAttr("hidden");
    });

    $("#close").click(function(){
        hideMessageFields();
    });

});

function sendMessageClickEvent() {
        if(isToken()) {
                var subject = $("#messageField").val();
                var link = $("#linkField").val();
                var content = $("contentField").val()

                if(subject == "") {
                    return;
                }

                addMessage(getURLParameter("dlid"), getDL_id(), subject, link, content);

                var message = parseMessage(
                {
                    'from_DL_id': getDL_id(), 
                    'DL_id': getDL_id(), 
                    'to_DL_id': getURLParameter("dlid"),
                    'subject': subject, 
                    'link': link,
                    'content': content
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
    $("#messageField").val("");
    $("#linkField").val("");
    $("#contentField").val("");
    hideMessageFields();
}


function setEntityInformation(dl_id){
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
    $("#entityImg").attr('src',info.img);
    $("#entityImg").attr('alt',info.name);
    $("#entityRole").text(info.type);
    $("#entityName").text(info.name);
}