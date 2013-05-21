test( "infostream test", function() {

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
