document.addEventListener("DOMContentLoaded",function(){
    setupPage({
        bar:true,
        barBackButton:true
    });

    if(isToken()) {
        var iPageID =getURLParameter("iPageID");
        var img = getURLParameter("src");
        var content = getURLParameter("content");
        $("#image").attr('src',img);
        } else {
                alert("UNAUTHORISED");
        }
        parseMessage(iPageID);
});

function parseMessage(message_id){
    info = getMessageInfo(message_id);
    $("#messageContent").append(getSubject(info));
    $("#listOfComments").append(getComments(info));
}

function getSubject(info){
    var from = getInfo(info.from_DL_id);
    var to = getInfo(info.DL_id);
    var content = "<div id='from'><h3>" + from.name + " >> " + to.name + "</h3><p id='time'>Time: " + info.created + "</p></div>";
    content += "<div><p id = 'subject'>" + info.subject + "</p></div>";
    content += "<div id='content'><p>" + info.content + "</p></div>";
    return content;
}

function getComments(info){
    var comments = info.comments;
    var content = "<ul>";
    //var date = new Date();
    $.each(comments,function(i,item){
        var sender = getInfo(item.uid);
        var imageEl = "<img src='" + sender.img + "'></img>";
        //var minPassed = date.getMinutes() - item.created.getMinutes();
        content += "<li>" + imageEl + "<b>" + item.name + ": </b>" + item.comment + "<p>Time: " + item.created + "</p></li>";

    });
    content += "</ul>";
    return content;
}

