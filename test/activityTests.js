var url = "https://www.dliv.in/rest/";
var authtoken = "test1234test";
var userId = "1234";
var to_dl_id = "4321";
var from_dl_id = "6543";
var type = "message";
var subject = "subject";
var link = "";
var username="test";
var password="test";


test( "addActivity REST test", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/addactivity2/,
		urlParams: [
			'uid',
			'auth',
			'to_dl_id',
			'from_dl_id',
			'type',
			'subject',
			'link'
		],
		response: function(settings) {
			equal(settings.data.uid, userId, "Userid ei muutu");
			equal(settings.data.auth, authtoken, "Auth ei muutu");
			equal(settings.data.to_dl_id, to_dl_id, "TO_DL_ID ei muutu");
			equal(settings.data.from_dl_id, from_dl_id, "From_DL_ID ei muutu");
			equal(settings.data.type, type, "Type ei muutu");
			equal(settings.data.subject, subject, "Subject ei muutu");
			equal(settings.data.link, link, settings.data.link, "Link ei muutu");
		}
		
	});

	addActivity(userId, authtoken, to_dl_id, from_dl_id, type, subject, link);

	$.mockjaxClear();

});

test( "addActivity unauthorized", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "addactivity2",
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	addActivity(userId, authtoken, to_dl_id, from_dl_id, type, subject, link);
	equal(status, 401);

	$.mockjaxClear();
});

test( "addActivity fail method test", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "addactivity2",
		status: 405,
		statusText: "Method not allowed",
		responseText: {
			ErrorCode: 405,
			ErrorMessage: "Method not allowed"
		}
	});
	
	addActivity(userId, authtoken, to_dl_id, from_dl_id, type, subject, link);
	equal(status, 405);

	$.mockjaxClear();
});

test( "addMessage test", function() {

	$.mockjaxClear();
		
	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			DL_id: userId,
			authtoken: authtoken,
			staff: null
		}

	})

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/addactivity2/,
		urlParams: [
			'uid',
			'auth',
			'to_dl_id',
			'from_dl_id',
			'type',
			'subject',
			'link'
		],
		response: function(settings) {
			equal(settings.data.uid, userId, "Userid ei muutu");
			equal(settings.data.auth, authtoken, "Auth ei muutu");
			equal(settings.data.to_dl_id, to_dl_id, "TO_DL_ID ei muutu");
			equal(settings.data.from_dl_id, from_dl_id, "From_DL_ID ei muutu");
			equal(settings.data.type, type, "Type ei muutu");
			equal(settings.data.subject, subject, "Subject ei muutu");
			equal(settings.data.link, link, settings.data.link, "Link ei muutu");
		}
		
	});

	login(username, password);
	addMessage(to_dl_id, from_dl_id, subject, link);

	$.mockjaxClear();

});

test( "addMessage unauthorized", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "addactivity2",
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	addMessage(to_dl_id, from_dl_id, subject, link);
	equal(getStatus(), 401);

	$.mockjaxClear();
});

test( "addMessage fail method test", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "addactivity2",
		status: 405,
		statusText: "Method not allowed",
		responseText: {
			ErrorCode: 405,
			ErrorMessage: "Method not allowed"
		}
	});
	addMessage(to_dl_id, from_dl_id, subject, link);
	equal(getStatus(), 405);

	$.mockjaxClear();
});

