<<<<<<< HEAD
document.addEventListener("DOMContentLoaded",function(){

    var scrollTimer = 0;

    $(window).scroll(function () {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function(){
            if($(window).scrollTop() + $(window).height() > $(document).height() - 500) {
                appendStreamF();
            }
        }, 100);
    });

=======
function initfrontpage(){
>>>>>>> master
    $("#sendMessageBox").click(sendMessageClickEvent);

    setupPage({
        bar: true,
        barBackButton: false
    });
    
    $("#inputField").focus(function() {
        $("#message-hidden").show();
    });

    $("#close").click(function(){
        hideMessageFields();
    });


    if(isToken()) {
        getOwnStream('message,cal,note',offset,function(stream){
            $("#appTitle").text(getName());
            $("#thelist").append(stream.join(''));
            addLiListener();
            $("#nameAndTypeBar p:last-child").text("Infostream");

        });            
    } else {
        alert("UNAUTHORISED");
    }
<<<<<<< HEAD
});
var offset=0;
function appendStreamF(){
    offset += 15;
    getOwnStream('message,cal,note',offset,function(stream){
            $("#thelist").append(stream.join(''));
            addLiListener();
        });
}
=======


}


>>>>>>> master

function sendMessageClickEvent() {
    if(isToken()) {
        var subject = $("#inputField").val();
        var link = $("#linkField").val();

        if(subject == "") {
            return;
        }
        addMessage(getDL_id(), getDL_id(), subject, link,null,null,function(){
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
    $("#inputField").val("");
    $("#linkField").val("");
    hideMessageFields();
}




