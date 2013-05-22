test( "InforStream REST test", function() {
	var userId = "1234";
    var authToken = "test1234test";
    var offset = 10;
    var limit = 10;

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

	getActivityStream(userId, authToken, offset, limit);
	
	$.mockjaxClear();

});

test( "infostream test own id correct token", function() {

    var userId="1234";
    var authToken="test1234test";
	$.mockjax({
		url: "*",
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
	equal(getActivityStream(userId,authToken)[0].subject,"anna testi data");

	$.mockjaxClear();

	});

test( "infostream test own id wrong token", function() {

    var userId="1234";
    var authToken="wrongtoken";
	$.mockjax({
		url: "*",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	equal(getActivityStream(userId,authToken).ErrorMessage,"Unauthorized");

	$.mockjaxClear();

	});

test( "infostream test wrong id right token", function() {

    var userId="1234";
    var authToken="test1234test";
	$.mockjax({
		url: "*",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	equal(getActivityStream(userId,authToken).ErrorMessage,"Unauthorized");

	$.mockjaxClear();

	});

