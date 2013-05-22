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
			equal(userId, settings.data.uid, "Userid ei muutu");
			equal(authtoken, settings.data.auth, "Auth ei muutu");
			equal(to_dl_id, settings.data.to_dl_id, "TO_DL_ID ei muutu");
			equal(from_dl_id, settings.data.from_dl_id, "From_DL_ID ei muutu");
			equal(type, settings.data.type, "Type ei muutu");
			equal(subject, settings.data.subject, "Subject ei muutu");
			equal(link, settings.data.link, "Link ei muutu");
		}
		
	});

	addActivity(userId, authtoken, to_dl_id, from_dl_id, type, subject, link);

	$.mockjaxClear();

	});

test( "addMessage test", function() {
	expect(0);
	
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
			equal(userId, settings.data.uid, "Userid ei muutu");
			equal(authtoken, settings.data.auth, "Auth ei muutu");
			equal(to_dl_id, settings.data.to_dl_id, "TO_DL_ID ei muutu");
			equal(from_dl_id, settings.data.from_dl_id, "From_DL_ID ei muutu");
			equal(type, settings.data.type, "Type ei muutu");
			equal(subject, settings.data.subject, "Subject ei muutu");
			equal(link, settings.data.link, "Link ei muutu");
		}
		
	});


	addMessage(to_dl_id, from_dl_id, subject, link);

	$.mockjaxClear();

	});

