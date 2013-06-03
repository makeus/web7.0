

document.addEventListener("DOMContentLoaded",function(){
    setPage({
        bar:true
    });
    if(isToken()) {
        var iPageID =getURLParameter("iPageID");
        $("#messageContent").replaceWith("Message id is: "+iPageID);
        
        } else {
                alert("UNAUTHORISED");
        }

});

