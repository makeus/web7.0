var url = "https://www.dliv.in/rest/";
var userId = "1234";
var authToken = "test1234test";
var offset = 10;
var limit = 10;
	
test( "parseMessagetest", function() {

	$.mockjaxClear();
	  

	
    $.mockjax({
        url: url + "stream",
        responseText: [{
            id: "1234",
            type: "message",
            sub_type: "",
            DL_id: "4321",
            from_DL_id: "1234",
            subject: "message",
            link: "",
            content: "message_body",
            locatio: "",
            time_from: "0000-00-00 00:00:00",
            time_to: "0000-00-00 00:00:00",
            acl: "read",
            whitelist_dlid: "",
            completed: null,
            completed_by: null,
            created: "2013-05-17 11:10:31",
            comments: "",
            relations: ""
        }]
    });
	var expected = "<li><ul class='message'>"
                + "<li>Message--</li>"
                + "<li>1234</li>" 
				+ "<li> to </li>" 
				+ "<li>4321</li>"  
				+ "<li id='subject'>message</li>" 
				+ "<li>: </li>"
				+ "<li id='content'>message_body</li>" 
				+ "</ul></li>";
	
	items = getActivityStream(userId, authToken, offset, limit);
	
	equal(parseMessage(items[0]), expected);
	equal(getStatus(), 1);

    $.mockjaxClear();
	
});

test( "parseNotetest", function() {

	$.mockjaxClear();

    $.mockjax({
        url: "*",
        responseText: [{
            id: "1234",
            type: "note",
            sub_type: "",
            DL_id: "4321",
            from_DL_id: "1234",
            subject: "message",
            link: "",
            content: "message_body",
            locatio: "",
            time_from: "0000-00-00 00:00:00",
            time_to: "0000-00-00 00:00:00",
            acl: "read",
            whitelist_dlid: "",
            completed: null,
            completed_by: null,
            created: "2013-05-17 11:10:31",
            comments: "",
            relations: ""

        }]
    });
	var expected = "<li><ul class='note'>"
                + "<li>Note--</li>"
                + "<li>1234</li>" 
				+ "<li> to </li>" 
				+ "<li>4321</li>"  
				+ "<li id='subject'>message</li>" 
				+ "<li>: </li>"
				+ "<li id='content'>message_body</li>" 
				+ "</ul></li>";

	items = getActivityStream(userId, authToken, offset, limit);
	
	equal(parseNote(items[0]), expected);
	equal(getStatus(), 1);

    $.mockjaxClear();
});

test( "parseCaltest", function() {

	$.mockjaxClear();
	
    $.mockjax({
        url: "*",
        responseText: [{
            id: "1234",
            type: "cal",
            sub_type: "",
            DL_id: "4321",
            from_DL_id: "1234",
            subject: "message",
            link: "",
            content: "message_body",
            locatio: "",
            time_from: "1000-02-03 04:05:00",
            time_to: "0000-00-00 00:00:00",
            acl: "read",
            whitelist_dlid: "",
            completed: null,
            completed_by: null,
            created: "2013-05-17 11:10:31",
            comments: "",
            relations: ""

        }]
    });
	var expected = "<li><ul class='event'>"
                + "<li>Event--</li>"
                + "<li id='date'>03.02.1000</li>"
				+ "<li id='subject'>message</li>" 
				+ "<li>04:05</li>"
				+ "</li></ul></li>";

	items = getActivityStream(userId, authToken, offset, limit);
	
	equal(parseCalEntry(items[0]), expected);
	equal(getStatus(), 1);

    $.mockjaxClear();
});

test( "parseNotificationTest", function() {

	$.mockjaxClear();
	
    $.mockjax({
        url: "*",
        responseText: [{
            id: "1234",
            type: "notification",
            sub_type: "",
            DL_id: "4321",
            from_DL_id: "1234",
            subject: "message",
            link: "",
            content: "message_body",
            locatio: "",
            time_from: "0000-00-00 00:00:00",
            time_to: "0000-00-00 00:00:00",
            acl: "read",
            whitelist_dlid: "",
            completed: null,
            completed_by: null,
            created: "2013-05-17 11:10:31",
            comments: "",
            relations: ""

        }]
    });
	var expected = "<li>Notification--</li><li>1234: 1234: message_body to 4321</li>";
	

	items = getActivityStream(userId, authToken, offset, limit);
	
	equal(parseNotification(items[0]), expected);
	equal(getStatus(), 1);

    $.mockjaxClear();
});

test( "dateTimeToDateTest", function() {
	var date = "1000-02-03 04:05:00";
	var expected = "03.02.1000";
	equal(datetimetoDate(date), expected);
});

test( "dateTimeToTimeTest", function() {
	var date = "1000-02-03 04:05:00";
	var expected = "04:05";
	equal(datetimetoTime(date), expected);
});