function addMessage(to_dl_id, from_dl_id, subject, link, content, done) {
	if(to_dl_id == null || from_dl_id == null || subject == null) {
		return -1;
	}
	var uid = getDL_id();
	var auth = getToken();
	var type = "message";
	addActivity({'uid': uid, 'auth':auth, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id,
   'type':type, 'subject': subject, 'content':content, 'link':link},
   function(data){
      success(data);
      done();
  },function(data){
    error(data);
    done();
  });
}

function addCommentToMessage(message_id, comment,done){
    if (comment==null || message_id==null){
      return -1;
    }
    var uid = getDL_id();
    var auth = getToken();
    var opts = {uid: uid, auth: auth, comment: comment,activity_id:message_id, dl_id:uid};
    var url = "comments";
    addCommentRest(opts,url,function(data) {
      result = data;
      success(data);
      done();
    },
    function(data) {
      result = data;
      error(data);
      done();
    });
}

function addEvent(to_dl_id, from_dl_id, subject, link, content, time_from, time_to, location, sub_type,done) {

  if(to_dl_id == null || from_dl_id == null || subject == null) {
    return -1;
  }
  var uid = getDL_id();
  var auth = getToken();
  var type = "cal";
  addActivity({'uid': uid, 'auth':auth, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id, 'type':type, 'subject': subject, 
               'content':content, 'link':link, 'time_from':time_from, 'time_to':time_to, 'location':location, 'sub_type':sub_type},
               function(data){
                success(data);
                done(data);
               },
               function(data){
                error(data);
                done(data);
               });

}

function getStream(opts,done){
  
    getActivityStream(opts,function(stream){
      saveStream(stream);
      var items =[];
      var dlids= [];
      var userHash={};

      //error retrieving the activity stream
      if(getStatus()!=1 || stream=="" || stream.responseText=="") {
        done(items);
      } else {
        /*
        Capture unique dlids from stream for retrieval of user data.
        */
        $.each(stream, function(i, item) {
              dlids.push(item.DL_id);
              dlids.push(item.from_DL_id);
        });
        dlids = $.unique(dlids);
        //Retrieve user data
        var users = {'uid': getDL_id(), 'auth': getToken(), 'dl_ids': dlids.join()};
        getUserArray(users,function(json){
        userHash=myHash(json);
        //parse and push each json entry into its own <li> block
        $.each(stream, function(i, item) {
              items.push(parseItem(item, userHash, item.type));
        });

        done(items);
        });
      }     
    //append <li> blocks to appropriate container
      
    });
}


function getOtherStream(types,dlid,done) {
    var opts = {'uid': getDL_id(), 'auth': getToken(), 'offset': 0, 'limit': 15, 'types': types+',', 'dlid':dlid};
    getStream(opts,done);
}

function getOwnStream(types,done) {
    var opts = {'uid': getDL_id(), 'auth': getToken(), 'offset': 0, 'limit': 15, 'types': types, 'stream': true};
    getStream(opts,done);

}

function myHash(json) {
    var hash = {};
    $.each(json, function(i, item) {
        hash[item.DL_id]=item;
    });

    return hash;
}

function showMessages(done) {
    getOwnStream("message",function(messages){
      if (messages !="") {
        $("#thelist").replaceWith("<ul id ='thelist'>" + messages.join('') + "</ul>")
    }
    done(messages);
    });
    
}


function parseItem(item, userHash, type) {
    if(item==undefined || item==null || item=="" || $.isEmptyObject(userHash) || type==undefined || type==null || type=="" ) {
      return "";
    }
    var entry = "<li class='listEL' id='" +item.id+ "' uid='"+item.from_DL_id+"'><section  class='eventElem' >"
                + "<img src=" + userHash[item.from_DL_id].img + " alt='pic' />"
                + "<div class='unandmsg'><div class='sendandre'><p class='user_name'>" +userHash[item.from_DL_id].name;
    
    if(item.DL_id != null && item.DL_id != undefined && item.DL_id != "" && item.DL_id != item.from_DL_id) {
        entry += ">>> " + userHash[item.DL_id].name;
    }
    entry += "</p></div>";
    if(type == "cal" && item.time_from != "0000-00-00 00:00:00"){
      entry += "<p class='eventTime'>"+item.time_from+"</p>";
    }

    entry += "<section class='message_content'>"
          + "<p class='subject'>" + item.subject + "</p>";

    if(item.content != null && item.content != undefined) {
        entry += "<p class='content'>" + item.content.substr(0,20);
    }

    entry += "</section></div></section></li>";

    return entry;
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
