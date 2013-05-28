
test( "InforStream REST test", function() {
	$.mockjaxClear();
	
	var userId = "1234";
    var authToken = "test1234test";
    var offset = 10;
    var limit = 10;
    var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit};
	var url = "stream";

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		urlParams: [
			'uid',
			'auth',
			'offset',
			'limit'
		],
		response: function(settings) {
			equal(settings.data.uid, userId, "Username ei muutu");
			equal(settings.data.auth, authToken, "Auth ei muutu");
			equal(settings.data.offset, offset, "Offset ei muutu");
			equal(settings.data.limit, limit, "Limit ei muutu");
		}
	});

	rest(opts,url,function(data) {
			result = data;
			success(data);
		},
		function(data) {
			result = data;
			error(data);
		});

	$.mockjaxClear();

});

test( "infostream test own id correct token", function() {

	$.mockjaxClear();
	
    var userId="1234";
    var authToken="wrongtoken";
	var offset="10";
	var limit="10";
	var types="note";
	var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit};
	var url = "stream";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		responseText: [{
			id: "1234",
			type: "note",
			sub_type: "",
			DL_id: "4321",
			from_DL_id: "1234",
			subject: "anna testi data",
			link: "",
			content: "",
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
	
	getActivityStream(opts);
	equal(status, 1);

	$.mockjaxClear();

});

test( "infostream test own id wrong token", function() {

	$.mockjaxClear();
	
    var userId="1234";
    var authToken="wrongtoken";
	var offset="10";
	var limit="10";
	var types="note";
	var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit};
	var url = "stream";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	
	getActivityStream(opts);
	equal(status, 401);
	$.mockjaxClear();

	});

test( "infostream test wrong id right token", function() {

	$.mockjaxClear();
	
    var userId="1234";
    var authToken="test1234test";
    var offset="10";
    var limit="10";
    var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit};
	var url = "stream";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	getActivityStream(opts);
	equal(status, 401);
	$.mockjaxClear();

});


test( "getStream test", function() {

	$.mockjaxClear();
	
    var userId="1234";
    var authToken="test1234test";
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		responseText: [{
			id: "1234",
			type: "note",
			sub_type: "",
			DL_id: "4321",
			from_DL_id: "1234",
			subject: "anna testi data",
			link: "",
			content: "",
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
	getStream("note");
	equal(getStatus(), 1);
	$.mockjaxClear();

});

test( "getStream Unauthorized", function() {

	$.mockjaxClear();
	
    var userId="1234";
    var authToken="test1234test";
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	getStream("note");
	equal(getStatus(), 401);
	$.mockjaxClear();

});

test( "getStream fail method test", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		status: 405,
		statusText: "Method not allowed",
		responseText: {
			ErrorCode: 405,
			ErrorMessage: "Method not allowed"
		}
	});
	
	getStream("note");
	equal(getStatus(), 405);

	$.mockjaxClear();
});
