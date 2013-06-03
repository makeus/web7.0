

document.addEventListener("DOMContentLoaded",function(){
    setPage({
        bar:true,
        barBackButton:true
    });
    if(isToken()) {
        var iPageID =getURLParameter("iPageID");
        var img = getURLParameter("src");
        var content = getURLParameter("content");
        $("#image").attr('src',img);
        $("#messageContent").replaceWith("Message id is: "+iPageID);
        
        } else {
                alert("UNAUTHORISED");
        }

});

