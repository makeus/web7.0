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
            $("#thelist").append(stream.join(''));
            scrollerInit();
            addLiListener();
            $("#thelist+img").hide();
            $("#nameAndTypeBar p:last-child").text("Infostream");
        });
    }
     else {
        alert("UNAUTHORISED");
    }
    
    offset = 0;
    intheend = 0;
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
                    $("#thelist").append(stream.join(''));
                    addLiListener();  
                }
        });
    }
}

