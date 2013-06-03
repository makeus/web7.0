

document.addEventListener("DOMContentLoaded",function(){
    setPage({
        bar:true
    });
    if(isToken()) {
        var iPageID =getURLParameter("iPageID");
        getInfo(iPageID);
        $("#messageContent").replaceWith("Message id is: "+iPageID);
        
        } else {
                alert("UNAUTHORISED");
        }

});
function getIPageId(id){
    return getInfo(id)
}
