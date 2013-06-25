function addMessage(to_dl_id, from_dl_id, subject, link, content, cc, done) {
  	if(to_dl_id == null || from_dl_id == null || subject == null) {
  		return -1;
  	}
  	var uid = getDL_id();
  	var auth = getToken();
  	var type = "message";
  	addActivity({'uid': uid, 'auth':auth, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id,
     'type':type, 'subject': subject, 'content':content, 'link':link, 'cc':cc},
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

function addEvent(to_dl_id, from_dl_id, subject, link, content, time_from, time_to, location, sub_type, cc, done) {
  if(to_dl_id == null || from_dl_id == null || subject == null) {
    return -1;
  }

  var uid = getDL_id();
  var auth = getToken();
  var type = "cal";

  addActivity({'uid': uid, 'auth':auth, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id, 'type':type, 'subject': subject, 
               'content':content, 'link':link, 'time_from':time_from, 'time_to':time_to, 'location':location, 'sub_type':sub_type, 'cc':cc},
               function(data){
                success(data);
                done(data);
               },
               function(data){
                error(data);
                done(data);
               });

}

function addNote(to_dl_id, from_dl_id, subject, content, time_to, cc, done) {
  if(to_dl_id == null || from_dl_id == null || subject == null) {
    return -1;
  }
  var uid = getDL_id();
  var auth = getToken();
  var type = "note";
  addActivity({'uid': uid, 'auth':auth, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id, 'type':type, 'subject': subject, 
               'content':content, 'time_to':time_to, 'cc':cc},
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
      saveStream(getSavedStream().concat(stream));
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
        getUserArray(dlids.join(),function(json){

          userHash=myHash(json, userHash);

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

function getStreamUrl(offset,done) {
  	if (getCurrent().name == 'frontpage') {
  		getOwnStream('message, note, cal', 0, done);
  	} else {
      var type = getParameter("type");
      var dlid = getParameter("dlid");
      if(type == undefined) {
          type = "message";
      }
      if(dlid == undefined) {
          dlid = getDL_id();
      }
      getOtherStream(type,dlid,offset,done);
    }

}

function getOtherStream(types,dlid,offset,done) {
    var opts = {'uid': getDL_id(), 'auth': getToken(), 'offset': offset, 'limit': 15, 'types': types+',', 'dlid':dlid};
    getStream(opts,done);
}

function getOwnStream(types,offset,done) {
    var opts = {'uid': getDL_id(), 'auth': getToken(), 'offset': offset, 'limit': 15, 'types': types, 'stream': true};
    getStream(opts,done);

}

function refreshStream(types, done) {
  getOwnStream(types, 0, done);
}

function getCCList(done) {
  var items=[];
  var relations=[];
  var userHash={};
  var uid = getDL_id();
  if(uid == undefined) {
    return;
  }

  var relations = getRelations();

  if(relations == null) {
    console.log("haloo olen tyhmä");
    done(items);
  } else {
    var dlids = [];
    $.each(relations, function(i, item) {
      dlids[i] = item.dlid;
    });

    getUserArray(dlids.join(), function(json) {      
      userHash = myHash(json, userHash);
      $.each(dlids, function(i, item) {
        items.push(parseCC(userHash[item]));
      });
        
     done(items);
    });
  }

}

function parseRelations(string) {
  if (string == undefined)
    return;

  var array = string.split(',');
  var relations = [];

  $.each(array, function(i, item) {
      item = item.split(':');

      relations[i] = {
        dlid: item[0],
        type: item[1]
      }
  });

  return relations;
}

function parseCC(info) {
  
  var entry = "<li class='liCC' id="+ info.DL_id+ "><p id=p_"+ info.DL_id+ " class='pCC'>" + info.name + "</p>"
         + "<input class='checkCC' id=check_" +info.DL_id+" type='checkbox' name=" + info.DL_id     
         +" value="+info.DL_id+">";

  if(info.img == "") {
    entry += "<img src='../resources/images/tyhja.png' alt='' />";
  }
  else {
    entry +=  "<img src='" + info.img + "' alt='' />";
  }

  entry += "</input></li><span class='clear'></span>"; 
  return entry;
}

function myHash(json, hash) {
    $.each(json, function(i, item) {
        hash[item.DL_id]=item;
    });

    return hash;
}




function parseItem(item, userHash, type) {

  if(item==undefined || item==null || item=="" || $.isEmptyObject(userHash) || type==undefined || type==null || type==""  || userHash==undefined ) {
    return "";
  }

  var sectionClass = "eventElem";
  if (item.completed !== null) {
    sectionClass += " completed";
  }

  var entry = "<li class='listEL' id='" +item.id+ "' uid='"+item.from_DL_id+"'>"
              + "<section  class='"+sectionClass+"' >";
  if(userHash[item.from_DL_id].img == "") {
    entry += "<img src='../resources/images/tyhja.png'";
  }
  else {
    entry +=  "<img src=" + userHash[item.from_DL_id].img;
  }
  entry += " alt='pic' />"
          + "<div class='unandmsg'><div class='sendandre'><p class='user_name'>" +userHash[item.from_DL_id].name;
  
  if(item.DL_id != null && item.DL_id != undefined && item.DL_id != "" && item.DL_id != item.from_DL_id) {
      entry += ">>> " + userHash[item.DL_id].name;
  }
  entry += "</p><p class='timeMsgCreated'>"+getTimeDiff(item.created)+"</p></div>";
  if(type == "cal" && item.time_from != "0000-00-00 00:00:00"){
    entry += "<p class='eventTime'>"+item.time_from+"</p>";
  }

  entry += "<section class='message_content'>";

  entry += "<p class='subject'>";
  if(item.subject.length > 70) {
    entry += item.subject.substr(0,70) + "...";
  } else {
    entry += item.subject;
  }
  entry += "</p>";

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
