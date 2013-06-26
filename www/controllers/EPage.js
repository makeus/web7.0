
function initEPage() {
    clearSavedStream();
    setupPage({
        bar: true,
        barBackButton: false,
        footer: true
    });

    if(isToken()) {
        showStream();
        setImagePosition();
        offset = 0;
        intheend = false;
    } else {
        alert("UNAUTHORISED");
    }  
}

function setImagePosition(){
    if($("#entityImg").width() == 200) {
        $("#entityImg").css('margin-left', '-100px');
    }
}

function showStream(){
    theList = $("#thelist");
    getStreamUrl(0,function(stream){
        if(stream != null && stream != "") {
            theList.append( stream.join('') );
            scrollerInit();
            addLiListener();
        } else {
            theList.append('<li><h3>The stream is empty</h3><h3>no ' + getStreamType() + 's were found!</h3></li>');
        }
        $("#thelist+img").hide();
    });
}

function getStreamType(){
    var t = getParameter('type');
    if (t==undefined) return 'message';

    if (t=='cal') return 'event';
          
    return t;
}

