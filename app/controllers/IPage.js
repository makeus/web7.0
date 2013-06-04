document.addEventListener("DOMContentLoaded",function(){
    setupPage({
        bar:true,
        barBackButton:true
    });

    if(isToken()) {
        var iPageID =getURLParameter("iPageID");
        //var content = getURLParameter("content");
    } else {
                alert("unauthorized");
    }
    parseMessage(iPageID);
    $(".senderName").click(function(){
        var dlid = $(this).attr('id');
        view.push("EPage", "index.html?dlid=" + dlid);
    });

});

function parseMessage(message_id){
    info = getMessageInfo(message_id);

    $("#messageContent").append(getSubject(info));
    $("#listOfComments").append(getComments(info));

}

function getSubject(info){
    var from = getInfo(info.from_DL_id);
    $("#messageContent > img").attr('src',from.img);
    var to = getInfo(info.DL_id);
    var content = "<div id='ipageFrom'><h3>" + from.name + " >> " + to.name + "</h3><p id='ipageTime'>Time: " + info.created + "</p></div>";
    content += "<div id='ipageSubjectDiv'><p id = 'ipageSubject'>" + info.subject + "</p></div>";
    content += "<div id='ipageContent'><p>" + info.content + "</p></div>";
    return content;
}

function getComments(info){
    var comments = info.comments;
    var content = "";
    var currTime = (new Date()).getTime();
    $.each(comments,function(i,item){
        //var sender = getInfo(item.uid);
        //var imageEl = "<img src='" + sender.img + "'></img>";
        content += "<li><p class='commentWriter'>" + item.name + ":</p><p class='commentText'>" + item.comment + "</p><p class='commentTime'>Time: " + getTimeDiff(item.created) + "</p></li>";
    });
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

