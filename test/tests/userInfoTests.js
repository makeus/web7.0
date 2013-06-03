var url = "https://www.dliv.in/rest/";

test( "user info REST test", function() {
	$.mockjaxClear();
	
	var uid = "1234";
    var authToken = "test1234test";
    var dl_id = "4321";
    var url="dlid";

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		response: function(settings) {
			equal(settings.data.uid, uid, "Oma id ei muutu");
			equal(settings.data.auth, authToken, "Auth ei muutu");
			equal(settings.data.dl_id, dl_id, "haettava dl_id ei muutu");
		}
	});

	rest({'dl_id':dl_id,'auth':authToken,'uid':uid},url,
		function(data) {
			searchResult = data;
			success(data);
		},
		function(data) {
			searchResult = data;
			error(data);
		});

	$.mockjaxClear();

});


test( "user info test correct token id uid", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var dl_id = "4321";
    var url="dlid";

	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		responseText: [{
			DL_id: "8653",
			type: "user",
			sub_type: "",
			relations: "7795:,8658",
			name: "Adele Vuohi",
			img: "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
			edited: "2013-05-22 07:31:55",
			created: "2013-05-21 13:55:43",
			created_by: "8653",
			edited_by: "8653"

		}]
	});
	
	rest({'dl_id':dl_id,'auth':authToken,'uid':uid},url,
		function(data) {
			searchResult = data;
			success(data);
		},
		function(data) {
			searchResult = data;
			error(data);
		});
	equal(status, 1);

	$.mockjaxClear();

});

test( "user info test correct token, uid, no permission to view page", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var dl_id = "4321";
    var url="dlid";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		responseText: [{
			DL_id: "8653",
			type: "user",
			sub_type: "",
			relations: "7795:,8658",
			name: "Adele Vuohi",
			img: "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
			edited: "2013-05-22 07:31:55",
			created: "2013-05-21 13:55:43",
			created_by: "8653",
			edited_by: "8653"

		}]
	});
	
	rest({'dl_id':dl_id,'auth':authToken,'uid':uid},url,
		function(data) {
			searchResult = data;
			success(data);
		},
		function(data) {
			searchResult = data;
			error(data);
		});
	equal(status, 1);

	$.mockjaxClear();
	});


test( "user info test wrong token, correct uid", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "tokenWoken";
    var dl_id = "4321";
    var url="dlid";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	rest({'dl_id':dl_id,'auth':authToken,'uid':uid},url,
		function(data) {
			searchResult = data;
			success(data);
		},
		function(data) {
			searchResult = data;
			error(data);
		});
	equal(status, 401);

	
	$.mockjaxClear();
	});

test( "user info test correct token, wrong uid", function() {

	$.mockjaxClear();
	
    var uid = "007";
    var authToken = "1234test4321";
    var dl_id = "4321";
    var url="dlid";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	rest({'dl_id':dl_id,'auth':authToken,'uid':uid},url,
		function(data) {
			searchResult = data;
			success(data);
		},
		function(data) {
			searchResult = data;
			error(data);
		});
	equal(status, 401);

	
	$.mockjaxClear();
	});



test( "getEntityInformation test", function() {

	$.mockjaxClear();
	
    var dl_id = "4321";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		responseText: [{
			DL_id: "8653",
			type: "user",
			sub_type: "",
			relations: "7795:,8658",
			name: "Adele Vuohi",
			img: "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
			edited: "2013-05-22 07:31:55",
			created: "2013-05-21 13:55:43",
			created_by: "8653",
			edited_by: "8653"

		}]
	});
	
	var result={
  "DL_id": "8653",
  "created": "2013-05-21 13:55:43",
  "created_by": "8653",
  "edited": "2013-05-22 07:31:55",
  "edited_by": "8653",
  "img": "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
  "name": "Adele Vuohi",
  "relations": "7795:,8658",
  "sub_type": "",
  "type": "user"
}
	var info=getEntityInformation(dl_id);
	equal(info[0].name,result.name);

	$.mockjaxClear();

});