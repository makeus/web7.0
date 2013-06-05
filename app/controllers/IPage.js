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
    if (info.content==""){
        $("#ipageContent").hide();
    } else {
        $("#ipageContent").show();
    }
    $("#listOfComments").append(getComments(info));

}

function getSubject(info){
    var ids = info.from_DL_id + "," + info.DL_id;
    var opts={'dl_ids':ids,'auth':getToken(),'uid':getDL_id()};
    var arr = getUserArray(opts);

    $("#messageContent > img").attr('src',arr[0].img);
    if(arr[1]){
        var content = "<div id='ipageFrom'><h3>" + arr[0].name + " >> " + arr[1].name + "</h3><p id='ipageTime'>Time: " + info.created + "</p></div>";
    }else {
        var content = "<div id='ipageFrom'><h3>" + arr[0].name + "</h3><p id='ipageTime'>Time: " + info.created + "</p></div>";
    }
    content += "<div id='ipageSubjectDiv'><p id = 'ipageSubject'>" + info.subject + "</p></div>";
    content += "<div id='ipageContent'><p>" + info.content + "</p></div>";
    return content;
}

function getComments(info){
    var comments = info.comments;
    var content = "";
    var currTime = (new Date()).getTime();
    $.each(comments,function(i,item){
        content += "<li><p class='commentWriter'>" + item.name + ":</p><p class='commentText'>" + item.comment + "</p><p class='commentTime'>Time: " + getTimeDiff(item.created) + "</p></li>";
    });
    if (content==""){
        $("#ipageComments").hide();
    } else {
        $("#ipageComments").show();
    }
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
            vastaus += " days ago";
        } else {
            vastaus += " day ago";
        }
        return vastaus;
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

