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
        $("#thelist+img").hide();
        $("#nameAndTypeBar p:last-child").text("Infostream");
    });
}

var offset=0;
var intheend = false;
function appendStreamF(){
    offset += 15;
    if(!intheend) {
        $("#thelist+img").show();
        getOwnStream('message,cal,note',offset,function(stream){
                if((stream.length < 1) || (!stream)) {
                    intheend = true;
                    $("#thelist+img").hide();
                } else {
                    theList.append(stream.join(''));
                    scroll_object.iscrollview("refresh");
                    addLiListener();  
                }
        });
    }
}

