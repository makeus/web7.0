function initfrontpage(){
    clearSavedStream();
    
    setupPage({
        bar: true,
        barBackButton: false,
        footer: true
    });
    
    if(isToken()) {
        showOwnStream();    
        insertCCList();
        offset = 0;
        intheend = 0;
    }
     else {
        alert("UNAUTHORISED");
    }
}

function showOwnStream(){
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
