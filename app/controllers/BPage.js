
var bPageID;
document.addEventListener("DOMContentLoaded",function(){
    setupPage({bar : true, barBackButton : true});

    if(isToken()) {
        setbPageID(getURLParameter("dlid"));
        var userInfo;
        getUserData(bPageID,function(userInfo){
            console.log(userInfo);
            parseBasicInfoPage(userInfo);
            $("#nameAndTypeBar p:last-child").text("Information");
        });
        //setPageTitle(userInfo.name);
        

    } else {
        alert("UNAUTHORISED");
    }
});


function setbPageID(id){
    bPageID = id;
}

function setPageTitle(name){
    $("#appTitle").text(name + ' - info');
}

function getUserInfo(bPageID) {
    return getOtherStream('perus',bPageID);
}

function parseBasicInfoPage(info){
    if(info==undefined){return;};
    appendImageAndUsername(info);
    //appendContent();
}

function appendImageAndUsername(info){
    if (info.img==undefined){return;}
    $("#profileImage").attr('src', info.img);
    $("#first_name").text(info.first_name + info.last_name);
   
}


function appendContent(info){
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