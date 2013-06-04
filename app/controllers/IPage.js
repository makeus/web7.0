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
    var currTime = (new Date()).getTime();
    $.each(comments,function(i,item){
        var sender = getInfo(item.uid);
        var imageEl = "<img src='" + sender.img + "'></img>";
        content += "<li>" + imageEl + "<b>" + item.name + ": </b>" + item.comment + "<p>Time: " + getTimeDiff(item.created) + "</p></li>";

    });
    content += "</ul>";
    return content;
}

function getTimeDiff(sendedTime){
    var date = sendedTime.replace(/-/g, '/');
    var diff = Math.abs(new Date() - new Date(date));
    var one_day = 1000*60*60*24;
    var one_hour = 1000*60*60;
    var one_minute = 1000*60;
    var days = diff/one_day;
    var vastaus = "";
    if (days>=1){
        diff -= one_day*days;
        vastaus += Math.floor(days);
        if (days>=2){
            vastaus += " days, ";
        } else {
            vastaus += " day, ";
        }
    }
    var hours = Math.floor(diff/one_hour);
    if (hours>=1){
        diff -= one_hour*hours;
        vastaus += hours;
        if (hours>=2){
            vastaus += " hours and ";
        } else {
            vastaus += " hour and ";
        }

    }
    var minutes = Math.floor(diff/one_minute);
    vastaus += minutes;
    if (minutes>=2){
         vastaus += " minutes ago.";
    } else {
        vastaus += " minute ago.";
    }
    return vastaus;
}

