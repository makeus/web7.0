document.addEventListener("DOMContentLoaded",function(){
	$("#sendMessage").hammer().on("tap", function() {
        if(isToken()) {
                addMessage(getDL_id(), getDL_id(), $("#messageField")[0].value, $("#linkField")[0].value, $("#contentField")[0].value );
        } else {
                alert("UNAUTHORISED");
        }
	});
    if(isToken()) {
        var stream=getStream('message,cal,note');
        $("#thelist").append( stream.join('') );
    } else {
        alert("UNAUTHORISED");
    }

    if(isToken()) {
        $("#searchButton").hammer().on("tap", function() {
            showModal("search");
        });
    }
});

var status = 0;

function addMessage(to_dl_id, from_dl_id, subject, link, content) {
	if(to_dl_id == null || from_dl_id == null || subject == null) {
		return -1;
	}
	var uid = getDL_id();
	var auth = getToken();
	var type = "message";
	addActivity({'uid': uid, 'auth':auth, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id, 'type':type, 'subject': subject, 'content':content, 'link':link});
}


function getStream(types) {
  	//loginrest
    var token=getToken();
  	var uid=getDL_id();
    var items =[];
    
    var stream=getActivityStream(uid,token,'0','50', types);
	
    //error retrieving the activity stream
    if(stream=="") {
      items.push(parseNothing());
    } else {
  	  //parse and push each json entry into its own <li> block
  	  $.each(stream, function(i, item) {
    	  switch(item.type) {
    	  	case 'cal':
    		  	items.push(parseCalEntry(item));
    		  	break;
    		  case 'message':
   		  		items.push(parseMessage(item));
    	  		break;
    	  	case 'notification': 
    	  		items.push(parseNotification(item));
    	  		break;
    	  	case 'note':
    	  		items.push(parseNote(item));
    	  		break;
    	  	default:
    	  		console.log("default");
    	  		break;
    	  }
	  });
    }     
	//append <li> blocks to appropriate container
    return items;
}

function showMessages() {
    var messages=getStream("message");
    if (messages !="") {
        $("#thelist").replaceWith("<ul id ='thelist'>" + messages.join('') + "</ul>")
    }
    return messages;
}

function parseCalEntry(item) {
	var entry = "<li><ul class='event'>"
                + "<li>Event--</li>"
                + "<li id='date'>" + datetimetoDate(item.time_from) + "</li>"
				+ "<li id='subject'>" + item.subject + "</li>" 
				+ "<li>" + datetimetoTime(item.time_from) + "</li>"
				+ "</li></ul></li>";
	return entry;
}

function parseMessage(item) {
	var entry = "<li><ul class='message'>"
                + "<li>Message--</li>"
                + "<li>" + item.from_DL_id 
				+ "</li><li> to </li><li>" + item.DL_id 
				+ "</li><li id='subject'>" + item.subject 
				+ "</li><li>: </li><li id='content'>" + item.content.substr(0,20) 
				+"</li></ul></li>";
    return entry;
}

function parseNotification(item) {
	var entry = "<li>Notification--</li>"
        + "<li>" +item.id 
        + ": " + item.from_DL_id 
        + ": " + item.content 
        + " to " + item.DL_id 
        + '</li>';
	return entry;
}

function parseNote(item) {
    var entry = "<li><ul class='note'>"
                + "<li>Note--</li>"
                + "<li>" + item.from_DL_id 
                + "</li><li> to </li><li>" + item.DL_id 
    			+ "</li><li id='subject'>" + item.subject 
    			+ "</li><li>: </li><li id='content'>" + item.content 
    			+"</li></ul></li>";
    return entry;
}

function parseNothing() {
    return '<li class="empty_li"></li>';
}

function datetimetoDate(date) {
	var year = date.substr(0,4);
	var month = date.substr(5,2);
	var day = date.substr(8,2);
	return "" + day + "." + month + "." + year;
}

function datetimetoTime(date) {
	return date.substr(11,5);
}



