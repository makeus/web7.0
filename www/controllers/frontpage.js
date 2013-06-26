function initfrontpage(){

    clearSavedStream();

    setupPage({
        bar: true,
        barBackButton: false,
        footer: true
    });
    
    if(isToken()) {
        getOwnStream('message,cal,note',0,function(stream){
            $("#appTitle").text(getName());
            theList = $("#thelist");
            theList.append(stream.join(''));
            scrollerInit();
            addLiListener();
            $("#thelist + div + img").hide();
            $("#nameAndTypeBar p:last-child").text("Infostream");
        });
    }
     else {
        alert("UNAUTHORISED");
    }
    
    offset = 0;
    intheend = false;
}
