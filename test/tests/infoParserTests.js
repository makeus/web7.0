test( "parseMessagetest", function() {
    var userId = "1234";
var authToken = "test1234test";
var offset = 10;
var limit = 10;
var types="note,cal,message";
var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit, 'types':types};
var url = "stream";

	$.mockjaxClear();
	  

	
    $.mockjax({
        url: /https:\/\/www.dliv.in\/rest\/stream/,
        urlParams: [
            'uid',
            'auth',
            'offset',
            'limit',
            'types'
        ],
        responseText: {
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
        }
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
	
	var items = rest(opts,url,function(data) {
            result = data;
            success(data);
        },
        function(data) {
            result = data;
            error(data);
        });
    console.log("wtf");
    console.log(items);
	
	equal(parseMessage(items), expected);
	equal(getStatus(), 1);

    $.mockjaxClear();
	
});

test( "parseNotetest", function() {
    var userId = "1234";
var authToken = "test1234test";
var offset = 10;
var limit = 10;
var types="note,cal,message";
var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit, 'types':types};
var url = "stream";

	$.mockjaxClear();

    $.mockjax({
        url: /https:\/\/www.dliv.in\/rest\/stream/,
        urlParams: [
            'uid',
            'auth',
            'offset',
            'limit',
            'types'
        ],
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

	items = rest(opts,url,function(data) {
            result = data;
            success(data);
        },
        function(data) {
            result = data;
            error(data);
        });
	
	equal(parseNote(items[0]), expected);
	equal(getStatus(), 1);

    $.mockjaxClear();
});

test( "parseCaltest", function() {
    var userId = "1234";
var authToken = "test1234test";
var offset = 10;
var limit = 10;
var types="note,cal,message";
var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit, 'types':types};
var url = "stream";

	$.mockjaxClear();
	
    $.mockjax({
        url: /https:\/\/www.dliv.in\/rest\/stream/,
        urlParams: [
            'uid',
            'auth',
            'offset',
            'limit',
            'types'
        ],
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

	items = rest(opts,url,function(data) {
            result = data;
            success(data);
        },
        function(data) {
            result = data;
            error(data);
        });
	
	equal(parseCalEntry(items[0]), expected);
	equal(getStatus(), 1);

    $.mockjaxClear();
});

test( "parseNotificationTest", function() {
    var userId = "1234";
var authToken = "test1234test";
var offset = 10;
var limit = 10;
var types="note,cal,message";
var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit, 'types':types};
var url = "stream";

	$.mockjaxClear();
	
    $.mockjax({
        url: /https:\/\/www.dliv.in\/rest\/stream/,
        urlParams: [
            'uid',
            'auth',
            'offset',
            'limit',
            'types'
        ],
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
	

	items = rest(opts,url,function(data) {
            result = data;
            success(data);
        },
        function(data) {
            result = data;
            error(data);
        });
	
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

test( "Show messages test found message", function() {
    var userId = "1234";
var authToken = "test1234test";
var offset = 10;
var limit = 10;
var types="message";
var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit, 'types':types};
var url = "stream";

    $.mockjaxClear();
    
    $.mockjax({
        url: /https:\/\/www.dliv.in\/rest\/stream/,
        urlParams: [
            'uid',
            'auth',
            'offset',
            'limit',
            'types'
        ],
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

    $.mockjax(
    {
        url:/https:\/\/www.dliv.in\/rest\/dlid/,
        responseText: [{
            DL_id: "4321",
            type: "user",
            sub_type: "",
            relations: "7795:,8658",
            name: "Adele Vuohi",
            img: "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
            edited: "2013-05-22 07:31:55",
            created: "2013-05-21 13:55:43",
            created_by: "4321",
            edited_by: "4321"
        }]
    });

    var expected = "<li><ul class='message'><li>Message--</li>"
                + "<li>1234</li><li> to </li>"
                + "<li>4321</li>"
                + "<li id='subject'>message</li>"
                + "<li>: </li><li id='content'>message_body</li>" 
                + "</ul></li>";
    
    equal(showMessages(),expected);
    equal(getStatus(),1);
    $.mockjaxClear();
});

test( "Show messages test no results", function() {
    var userId = "1234";
    var authToken = "test1234test";
    var offset = 10;
    var limit = 10;
    var types="message";
    var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit, 'types':types, 'dlid':1234};

    $.mockjaxClear();
    
    $.mockjax({
        url: /https:\/\/www.dliv.in\/rest\/stream/,
        urlParams: [
            'uid',
            'auth',
            'offset',
            'limit',
            'types'
        ],
        status:201,
        responseText: ""
    });
    var expected = '<li class="empty_li"></li>';
    
    equal(showMessages(),expected);
    equal(getStatus(),201);
    $.mockjaxClear();
});
