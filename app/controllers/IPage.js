

document.addEventListener("DOMContentLoaded",function(){
    setPage({
        bar:true,
        barBackButton:true
    });
    if(isToken()) {
        var iPageID =getURLParameter("iPageID");
        $("#messageContent").replaceWith("Message id is: "+iPageID);
        
        } else {
                alert("UNAUTHORISED");
        }

});

