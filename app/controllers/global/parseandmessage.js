function addMessage(to_dl_id, from_dl_id, subject, link, content) {
	if(to_dl_id == null || from_dl_id == null || subject == null) {
		return -1;
	}
	var uid = getDL_id();
	var auth = getToken();
	var type = "message";
	addActivity({'uid': uid, 'auth':auth, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id, 'type':type, 'subject': subject, 'content':content, 'link':link});
}


function getStream(types,dlid) {
    var items =[];
    var opts = {'uid': getDL_id(), 'auth': getToken(), 'offset': 0, 'limit': 15, 'types': types,'dlid':dlid};

    var stream=getActivityStream(opts);
    var dlids= [];
    var userHash={};

    //error retrieving the activity stream
    if(getStatus()!=1) {
      items.push(parseNothing());
    } else {
      /*
      Capture unique dlids from stream for retrieval of user data.
      */
      $.each(stream, function(i, item) {
            dlids.push(item.DL_id);
            dlids.push(item.from_DL_id);
      });
      dlids = $.unique(dlids);
      //alert (dlids);
      //Retrieve user data
      var users = {'uid': getDL_id(), 'auth': getToken(), 'dl_ids': dlids.join()};
      var json = getUserArray(users);
      userHash=myHash(json);
      //alert (userHash['8618'].name);
      //alert (userHash['8653'].name);
      //parse and push each json entry into its own <li> block
  	  $.each(stream, function(i, item, userHash) {
    	  switch(item.type) {
    	  	case 'cal':
    		  	items.push(parseCalEntry(item, userHash));
    		  	break;
    		  case 'message':
   		  		items.push(parseMessage(item, userHash));
    	  		break;
    	  	case 'notification': 
    	  		items.push(parseNotification(item, userHash));
    	  		break;
    	  	case 'note':
    	  		items.push(parseNote(item, userHash));
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

function myHash(json) {
    var hash = {};
    $.each(json, function(i, item) {
        //alert (item.DL_id);
        hash[item.DL_id]=item;
        //alert (hash[item.DL_id].DL_id);
    });
    //alert (hash['8653'].DL_id);
    //alert (hash['8618'].DL_id);
    return hash;
}

function showMessages() {
    var messages=getStream("message");
    if (messages !="") {
        $("#thelist").replaceWith("<ul id ='thelist'>" + messages.join('') + "</ul>")
    }
    return messages;
}

function parseCalEntry(item, userHash) {
	var entry = "<li><ul class='event'>"
                + "<li>Event--</li>"
                + "<li id='date'>" + datetimetoDate(item.time_from) + "</li>"
				+ "<li id='subject'>" + item.subject + "</li>" 
				+ "<li>" + datetimetoTime(item.time_from) + "</li>"
				+ "</li></ul></li>";
	return entry;
}

function parseMessage(item, userHash) {
	var entry = "<li><ul class='message'>"
                + "<li>Message--</li>"
                + "<li>" + item.from_DL_id
				+ "</li><li> to </li><li>" + item.DL_id 
				+ "</li><li id='subject'>" + item.subject;

    if(item.content != null && item.content != undefined) {
        entry += "</li><li>: </li><li id='content'>" + item.content.substr(0,20);
    }

    entry += "</li></ul></li>";

    return entry;
}

function parseNotification(item, userHash) {
	var entry = "<li>Notification--</li>"
        + "<li>" +item.id 
        + ": " + item.from_DL_id 
        + ": " + item.content 
        + " to " + item.DL_id 
        + '</li>';
	return entry;
}

function parseNote(item, userHash) {
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
