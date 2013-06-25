
function initEPage() {
    clearSavedStream();
    setupPage({
        bar: true,
        barBackButton: false,
        footer: true
    });

    if(isToken()) {
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
    } else {
        alert("UNAUTHORISED");
    }

    if($("#entityImg").width() == 200) {
        $("#entityImg").css('margin-left', '-100px');
    }

    offset = 0;
    intheend = false;
}

var offset=0;
var intheend = false;

function getStreamType(){
    var t = getParameter('type');
    if (t==undefined){
        return 'message';
    } 
    if (t=='cal'){
        return 'event';
    }
    return t;
}

function appendStreamE(){
    offset += 15;
    if(!intheend) {
        $("#thelist+img").show();
        getStreamUrl(offset,function(stream){
            if((stream.length < 1) || (!stream)) {
                intheend = true;
                $("#thelist+img").hide();
             } else {
                theList.append( stream.join('') );
                scroll_object.iscrollview("refresh");
                addLiListener(); 
            }
        });
    }
}

