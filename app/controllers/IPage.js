var iPageID;
document.addEventListener("DOMContentLoaded",function(){
    setupPage({
        bar:true,
        barBackButton:true
    });

    if(isToken()) {
        setIPageID(getURLParameter("iPageID"));
        showImage();
        parseMessage();
        setLinkToSenderEvent();
        setAddCommentEvent();
    } else {
        alert("UNAUTHORISED");
    }
});


function setIPageID(id){
    iPageID = id;
}

function showImage(){
    var img = getURLParameter("src");
    $("#image").attr('src',img);
}

function setLinkToSenderEvent(){
    $(".commentWriter").click(function(){
        var dlid = $(this).attr('id');
        view.push("EPage", "index.html?dlid=" + dlid);
    });
}

function setAddCommentEvent(){
    $("#addComment").click(function(){
        var comm = $(".commentArea").val();
        if (comm!=""){
            addCommentToMessage(iPageID, comm);
            var comment = "<li><p id='"+getDL_id()+"' class='commentWriter'>" + getName() + ":</p><p class='commentText'>" + comm + "</p><p class='commentTime'>Time: just now</p></li>";;
            $("#listOfComments").append(comment);
            $(".commentArea").val("");
            setLinkToSenderEvent();
            $("#ipageComments").show();
        }
    });
}


function parseMessage(){
    info = getMessageInfo(iPageID);
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
        var content = "<div id='ipageFromAndSubject'><h3>" + arr[0].name + " >> " + arr[1].name + "</h3><p id='ipageTime'>Time: " + info.created + "</p>";
    }else {
        var content = "<div id='ipageFromAndSubject'><h3>" + arr[0].name + "</h3><p id='ipageTime'>Time: " + info.created + "</p>";
    }
    content += "<p id = 'ipageSubject'>" + info.subject + "</p></div>";
    content += "<div id='ipageContent'><p>" + info.content + "</p></div>";
    return content;
}

function getComments(info){
    var comments = info.comments;
    var content = "";
    var currTime = (new Date()).getTime();
    $.each(comments,function(i,item){
        content += "<li><p id='"+item.uid+"' class='commentWriter'>" + item.name + ":</p><p class='commentText'>" + item.comment + "</p><p class='commentTime'>Time: " + getTimeDiff(item.created) + "</p></li>";
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

