var uid = "6666";
var auth = "uliuuToken666";
var dl_id_from = "6666";
var dl_id_to = "1000";


asyncTest( "valid addrelation request is sent", function() {
	$.mockjaxClear();

	var data = {
		DL_id: uid,
		authtoken: auth
	}

	saveDL_id(data);
	saveToken(data);
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/addrelation/,

		response: function(settings) {
			equal(settings.data.uid, uid, "Oma id löytyy");
			equal(settings.data.auth, auth, "Token löytyy");
			equal(settings.data.dl_id_from, dl_id_from, "dl_id_from löytyy");
			equal(settings.data.dl_id_to, dl_id_to, "dl_id_to löytyy");
			equal(settings.data.role, "", "role on tyhjä");
			this.responseText = { "success": "1" }
		}
	});

	createRelation(dl_id_from, dl_id_to, null, function() {
		start();
		equal(getStatus(), 1);
	});
	
	$.mockjaxClear();
});


asyncTest( "valid addrelation request with role is sent", function() {
	$.mockjaxClear();

	var role = "child";

	var data = {
		DL_id: uid,
		authtoken: auth
	}

	saveDL_id(data);
	saveToken(data);
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/addrelation/,

		response: function(settings) {
			equal(settings.data.uid, uid, "Oma id löytyy");
			equal(settings.data.auth, auth, "Token löytyy");
			equal(settings.data.dl_id_from, dl_id_from, "dl_id_from löytyy");
			equal(settings.data.dl_id_to, dl_id_to, "dl_id_to löytyy");
			equal(settings.data.role, role, "role löytyy");
			this.responseText = { "success": "1" }
		}
	});

	createRelation(dl_id_from, dl_id_to, role, function() {
		start();
		equal(getStatus(), 1);
	});
	
	$.mockjaxClear();
});

