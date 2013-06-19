function initfrontpage(){


    $("#sendMessageBox").click(sendMessageClickEvent);

    setupPage({
        bar: true,
        barBackButton: false
    });
    
    $("#inputField").focus(function() {
        $("#message-hidden").show();
    });

    $("#close").click(function(){
        $("#message-hidden").hide();
    });


    if(isToken()) {
        getOwnStream('message,cal,note',0,function(stream){
            $("#appTitle").text(getName());
            $("#thelist").append(stream.join(''));
            addLiListener();
            $("#nameAndTypeBar p:last-child").text("Infostream");
            $("#scroller").iscrollview();

        });            
    } else {
        alert("UNAUTHORISED");
    }

    printDebugInfo();
}


var offset=0;
function appendStreamF(){
    offset += 15;
    getOwnStream('message,cal,note',offset,function(stream){
            $("#thelist").append(stream.join(''));
            addLiListener();
        });
}


function sendMessageClickEvent() {
    if(isToken()) {
        var subject = $("#inputField").val();
        var link = $("#linkField").val();

        if(subject == "") {
            return;
        }
        addMessage(getDL_id(), getDL_id(), subject, link,null,null,function(){
            $.mobile.showPageLoadingMsg();
            setTimeout(function() {
                getOwnStream('message,cal,note', 0, function(stream){
                    $("#thelist").replaceWith("<ul id='thelist'>" + stream.join('') + "</ul>");
                    resetMessageFields();
                    addLiListener();
                    $.mobile.hidePageLoadingMsg();
                });
            }, 2000)

        });
    } else {
        alert("UNAUTHORISED");
    }
}

function resetMessageFields() {
    $("#inputField").val("");
    $("#linkField").val("");
    $("#message-hidden").hide();
}




