var iPageID;
function initIPage() {
    setupPage({
        bar:true,
        barBackButton:true
    });

    if(isToken()&&getParameter("iPageID")) {
        setIPageID(getParameter("iPageID"));
        parseMessage();
        setLinkToSenderEvent();
        setAddCommentEvent();
        setCommentFocusEvent();
        setCompleteMarkerEvent();
    } else {
        alert("UNAUTHORISED");
    }
}


function setIPageID(id){
    iPageID = id;
}


function setCommentFocusEvent() {
    $("section#commentArea > textarea").focus(function(){
        $("section#commentArea > textarea").attr("rows", 10);
        $("#sendMessageBox").show();
    });
}

function setLinkToSenderEvent(){
    $(".commentWriter").on('tap', function(){
        var dlid = $(this).attr('id');
        view.push("EPage", {'dlid': dlid});         //view.push("EPage", "index.html?dlid=" + dlid);
    });
}

function setAddCommentEvent(){
    $(".addComment").on('tap', function(){
        var comm = $(".commentArea").val();
        if (comm!=""){
            addCommentToMessage(iPageID, comm,function(){});
            var comment = "<li><a id='"+getDL_id()+"' class='commentWriter'>" + getName() + ":</a><p class='commentText'>" + comm + "</p><p class='commentTime'>Time: just now</p></li>";;
            $("#listOfComments").append(comment);
            $(".commentArea").val("");
            setLinkToSenderEvent();
            $("#ipageComments").show();
        }
    });
}

function setCompleteMarkerEvent() {
    $("#completeCheckbox").change(function() {
        if (this.checked) {
            $("#ipageMessage").addClass("completed");
            setActivityCompleted(true);
        } else {
            $("#ipageMessage").removeClass();
            setActivityCompleted(false);
        }
    });
}


function parseMessage(){
    var info = getMessageInfo(iPageID);
    switch(info.type) {
        case 'cal':
            $("#nameAndTypeBar p:last-child").text("Task");
            break;
        case 'message':
            $("#nameAndTypeBar p:last-child").text("Message");
            break;
        case 'note':
            $("#nameAndTypeBar p:last-child").text("To-Do Note");
            break;
        default:
            $("#nameAndTypeBar p:last-child").text("Message");
    }
    getSubject(info);
    if (info.content==""){
        $("#ipageContent").hide();
    } else {
        $("#ipageContent").show();
    }

    if (info.type === "cal" || info.type === "note") {
        $("#completeMarker").show();
    } else {
        $("#completeMarker").hide();
    }

    if (info.completed !== null) {
        $("#ipageMessage").attr("class", "completed");
        $("#completeCheckbox").prop("checked", true);
    }
    getComments(info);
}

function getSubject(info){
    var ids = info.DL_id + "," + info.from_DL_id;

    var arr = getUserArray(ids, function(arr) {
        var from = getParameter("uid");
        var to;

        if(arr[0].DL_id == from) {
            to = arr[1];
            from = arr[0];
        } else {
            to = arr[0];
            from = arr[1];
        }
        $("#messageContent > img").attr('src',from.img);

        if(to){
            var content = "<h3>" + from.name + " >> " + to.name + "</h3><p id='ipageTime'>Time: " + info.created + "</p>";
        } else {
            var content = "<h3>" + from.name + "</h3><p id='ipageTime'>Time: " + info.created + "</p>";
        }

        content += "<p id = 'ipageSubject'>" + info.subject + "</p>";
        $("#ipageFormAndSubject").append(content);

        $("#ipageContent").append("<p>" + info.content + "</p>");
    });
    
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

    $("#listOfComments").append(content);
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

