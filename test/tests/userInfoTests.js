var url = "https://www.dliv.in/rest/";

asyncTest( "user info REST test", function() {
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
			start();
			searchResult = data;
			success(data);
		},
		function(data) {
			start();
			searchResult = data;
			error(data);
		});

	$.mockjaxClear();

});


asyncTest( "user info test correct token id uid", function() {

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
			start();
			searchResult = data;
			success(data);
				equal(status, 1);
					$.mockjaxClear();


		},
		function(data) {
			start();
			searchResult = data;
			error(data);
				equal(status, 1);
					$.mockjaxClear();


		});


});

asyncTest( "user info test correct token, uid, no permission to view page", function() {

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
			start();
			searchResult = data;
			success(data);
				equal(status, 1);
					$.mockjaxClear();


		},
		function(data) {
			start();
			searchResult = data;
			error(data);
				equal(status, 1);
					$.mockjaxClear();


		});

	});


asyncTest( "user info test wrong token, correct uid", function() {

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
			start();
			searchResult = data;
			success(data);
			equal(status, 401);
				$.mockjaxClear();

		},
		function(data) {
			start();
			searchResult = data;
			error(data);
			equal(status, 401);
				$.mockjaxClear();

		});
	

	
	});

asyncTest( "user info test correct token, wrong uid", function() {

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
			start();
			searchResult = data;
			success(data);
			equal(status, 401);
				$.mockjaxClear();

		},
		function(data) {
			start();
			searchResult = data;
			error(data);
			equal(status, 401);
				$.mockjaxClear();

		});

	
	});



asyncTest( "getEntityInformation test", function() {

	$.mockjaxClear();
	
    var dl_id = "4321";
	$.mockjax({
		url: "*",
		responseText: {
			DL_id: "4321",
			type: "user",
			sub_type: "",
			relations: "7795:,8658",
			name: "Adele Vuohi",
			img: "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
			edited: "2013-05-22 07:31:55",
			created: "2013-05-21 13:55:43",
			created_by: "8653",
			edited_by: "8653"

		}
	});
	
	var result={
	  "DL_id": "4321",
	  "created": "2013-05-21 13:55:43",
	  "created_by": "8653",
	  "edited": "2013-05-22 07:31:55",
	  "edited_by": "8653",
	  "img": "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
	  "name": "Adele Vuohi",
	  "relations": "7795:,8658",
	  "sub_type": "",
	  "type": "user"
	};
	localStorage.clear();
	getInfo(dl_id,function(data){
		start();
		equal(data.name,result.name);
		$.mockjaxClear();
	});

});

asyncTest( "getUserArray resttest", function() {

	$.mockjaxClear();

    var uid = "4321";
    var dl_ids = "8762, 2838, 19394";
    var authToken = "1231testauth1231";
	
	var data = {'DL_id': uid, 'authtoken': authToken};
    saveToken(data);
    saveDL_id(data);

    console.log("TOKEN: " + getToken());

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_ids',
			'auth',
			'uid'
		],
		response: function(settings) {
			console.log(settings.data);
			ok(settings.data.dl_ids.indexOf("8762") != -1);
     		ok(settings.data.dl_ids.indexOf("2838") != -1);
      		ok(settings.data.dl_ids.indexOf("19394") != -1);
			this.responseText = [];
			
		}
	});
	
	getUserArray(dl_ids,function(){
		start();
		$.mockjaxClear();
	});

});

asyncTest ("getUserArray test one user", function() {
	$.mockjaxClear();

    var dl_id = "4321";
	
	$.mockjax({
		url: url + "dlid",
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
	};

	getUserArray(dl_id,function(info){
		start();
		equal(info[0].name,result.name);
		equal(info[0].DL_id, result.DL_id);
		$.mockjaxClear();
	});
});


asyncTest ("getUserArray test multiple user", function() {
	$.mockjaxClear();

    var dl_id = "8653, 86531";

	
	$.mockjax({
		url: url + "dlid",
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

		},
		{
			DL_id: "86531",
			type: "user",
			sub_type: "",
			relations: "7795:,8658",
			name: "Adele Vuohi2",
			img: "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
			edited: "2013-05-22 07:31:55",
			created: "2013-05-21 13:55:43",
			created_by: "8653",
			edited_by: "8653"

		}]
	});

	var result1={
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
	};
	var result2={
	  "DL_id": "86531",
	  "created": "2013-05-21 13:55:43",
	  "created_by": "8653",
	  "edited": "2013-05-22 07:31:55",
	  "edited_by": "8653",
	  "img": "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
	  "name": "Adele Vuohi2",
	  "relations": "7795:,8658",
	  "sub_type": "",
	  "type": "user"
	};

	getUserArray(dl_id,function(info){
		start();
		equal(info[0].name,result1.name);
		equal(info[0].DL_id, result1.DL_id);
		equal(info[1].name,result2.name);
		equal(info[1].DL_id, result2.DL_id);
		$.mockjaxClear();
	});
});