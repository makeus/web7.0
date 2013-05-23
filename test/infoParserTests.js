test( "getStreamTest no stream retrieved", function() {
    var userId="1234";
    var authToken="test1234test";
    var expected='<li class="empty_li"></li>';

    $.mockjax({
        url: "*",
        responseText: ""
    });    
	
    equal(getStream("message,cal,note"),expected);

});


test( "parseMessagetest", function() {
    var json = '{
        "id": "1",
        "type": "message",
        "sub_type": "",
        "DL_id": "4321",
        "from_DL_id": "1234",
        "subject": "message",
        "link": "",
        "content": "message_body",
        "location": "",
        "time_from": "0000-00-00 00:00:00",
        "time_to": "0000-00-00 00:00:00",
        "acl": "read",
        "whitelist_dlid": "",
        "completed": null,
        "completed_by": null,
        "created": "2013-05-22 09:56:43",
        "comments": "",
        "relations": ""
    }';
	var expected = "<li><ul class='message'><li>1234</li>" 
				+ "<li> to </li>" 
				+ "<li>4321</li>"  
				+ "<li id='subject'>message</li>" 
				+ "<li>: </li>"
				+ "<li id='content'>message_body</li>" 
				+ "</ul></li>";

	equal(parseMessage(json),expected);
});

test( "parseNotetest", function() {
    var json = '{
        "id": "1",
        "type": "note",
        "sub_type": "",
        "DL_id": "4321",
        "from_DL_id": "1234",
        "subject": "message",
        "link": "",
        "content": "message_body",
        "location": "",
        "time_from": "0000-00-00 00:00:00",
        "time_to": "0000-00-00 00:00:00",
        "acl": "read",
        "whitelist_dlid": "",
        "completed": null,
        "completed_by": null,
        "created": "2013-05-22 09:56:43",
        "comments": "",
        "relations": ""
    }';
	var expected = "<li><ul class='message'><li>1234</li>" 
				+ "<li> to </li>" 
				+ "<li>4321</li>"  
				+ "<li id='subject'>message</li>" 
				+ "<li>: </li>"
				+ "<li id='content'>message_body</li>" 
				+ "</ul></li>";

	equal(parseNote(json),expected);
});

test( "parseCaltest", function() {
    var json = '{
        "id": "1",
        "type": "cal",
        "sub_type": "",
        "DL_id": "4321",
        "from_DL_id": "1234",
        "subject": "message",
        "link": "",
        "content": "message_body",
        "location": "",
        "time_from": "1000-02-03 04:05:00",
        "time_to": "0000-00-00 00:00:00",
        "acl": "read",
        "whitelist_dlid": "",
        "completed": null,
        "completed_by": null,
        "created": "2013-05-22 09:56:43",
        "comments": "",
        "relations": ""
    }';
	var expected = "<li><ul class='event'><li id='date'>03.02.1000</li>"
				+ "<li id='subject'>message</li>" 
				+ "<li>04:05</li>"
				+ "</li></ul></li>";

	equal(parseCalEntry(json),expected);
});

test( "parseNotificationTest", function() {
    var json = '{
        "id": "1",
        "type": "notification",
        "sub_type": "",
        "DL_id": "4321",
        "from_DL_id": "1234",
        "subject": "message",
        "link": "",
        "content": "message_body",
        "location": "",
        "time_from": "1000-02-03 04:05:00",
        "time_to": "0000-00-00 00:00:00",
        "acl": "read",
        "whitelist_dlid": "",
        "completed": null,
        "completed_by": null,
        "created": "2013-05-22 09:56:43",
        "comments": "",
        "relations": ""
    }';
	var expected = "<li>1: 1234: message_body to 4321</li>";

	equal(parseNotification(json),expected);
});

test( "dateTimeToDateTest", function() {
	var date = "1000-02-03 04:05:00";
	var expected = "03.02.1000";
	equal(datetimetoDate(date), expected);
})

test( "dateTimeToTimeTest", function() {
	var date = "1000-02-03 04:05:00";
	var expected = "04:05";
	equal(datetimetoTime(date), expected);
})