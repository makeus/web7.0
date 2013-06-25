function initfrontpage(){

    clearSavedStream();

    $("#sendMessageBox").click(sendMessageClickEvent);

    setupPage({
        bar: true,
        barBackButton: false
    });
    
    $("#inputField").focus(function() {
        $("#message-hidden").show();
        $(".listEL:first-child").off();
    });

    $(".closelink").click(function(){
        $("#message-hidden").hide();
        $("#inputField").blur();
        addLiListener();
    });


    if(isToken()) {
        getOwnStream('message,cal,note',0,function(stream){
            $("#appTitle").text(getName());
            theList = $("#thelist");
            theList.append(stream.join(''));
            scrollerInit();
            addLiListener();
            $("#thelist+img").hide();
            $("#nameAndTypeBar p:last-child").text("Infostream");
        });
    }
     else {
        alert("UNAUTHORISED");
    }
    
    offset = 0;
    intheend = 0;
}


var offset=0;
var intheend = false;
function appendStreamF(){
    offset += 15;
    if(!intheend) {
        $("#thelist+img").show();
        getOwnStream('message,cal,note',offset,function(stream){
                if((stream.length < 1) || (!stream)) {
                    intheend = true;
                    $("#thelist+img").hide();
                } else {
                    theList.append(stream.join(''));
                    scroll_object.iscrollview("refresh");
                    addLiListener();  
                }
        });
    }
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
                    theList.html(stream.join(''));
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




