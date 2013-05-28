var url = "https://www.dliv.in/rest/";

test( "search REST test", function() {
	$.mockjaxClear();
	
	var uid = "1234";
    var authToken = "test1234test";
    var search = "ade";

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/search/,
		urlParams: [
			'q',
			'auth',
			'uid'
		],
		response: function(settings) {
			equal(settings.data.uid, uid, "Oma id ei muutu");
			equal(settings.data.auth, authToken, "Auth ei muutu");
			equal(settings.data.q, q, "haku parametri ei muutu");
		}
	});

	searchRest({'q':search,'auth':authToken,'uid':uid});

	$.mockjaxClear();

});


test( "search correct id token", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var search = "ade";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/search/,
		urlParams: [
			'q',
			'auth',
			'uid'
		],
		responseText: [
		{
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
		DL_id: "7559",
		type: "thing",
		sub_type: "",
		relations: "7558:child:",
		name: "Sadeantura 1GS00",
		img: "",
		edited: "2013-03-14 13:03:02",
		created: "2013-03-14 13:03:02",
		created_by: "1938",
		edited_by: "1938"
		},
		{
		DL_id: "7610",
		type: "project",
		sub_type: "",
		relations: "7609:child",
		name: "JADE",
		img: "https://dlfwwwfiles.s3.amazonaws.com/images/7610/thumb_top.jpg",
		edited: "2013-03-28 11:30:35",
		created: "2013-03-22 09:15:58",
		created_by: "200",
		edited_by: "2"
		},
		{
		DL_id: "8654",
		type: "thing",
		sub_type: "Jatevesi",
		relations: "6516:child",
		name: "Sadevesikaivo SVK1",
		img: "",
		edited: "2013-05-22 07:03:57",
		created: "2013-05-22 07:03:57",
		created_by: "1938",
		edited_by: "1938"
		},
		{
		DL_id: "8655",
		type: "thing",
		sub_type: "Jatevesi",
		relations: "6516:child",
		name: "Sadevesikaivo SVK2",
		img: "",
		edited: "2013-05-22 07:04:20",
		created: "2013-05-22 07:04:20",
		created_by: "1938",
		edited_by: "1938"
		}
		]
	});
	
	searchRest({'q':search,'auth':authToken,'uid':uid});
	equal(status, 1);

	$.mockjaxClear();

});

test( "search correct token, uid, cant find anything", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var search = "ade";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/search/,
		urlParams: [
			'q',
			'auth',
			'uid'
		],
		responseText: {
			success: "1"
		}
	});
	
	searchRest({'q':search,'auth':authToken,'uid':uid});
	equal(status, 1);

	$.mockjaxClear();
});
test( "search wrong token, correct uid", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "tokenWoken";
    var search = "ade";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/search/,
		urlParams: [
			'q',
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
	
	searchRest({'q':search,'auth':authToken,'uid':uid});
	equal(status, 401);

	$.mockjaxClear();
	});

test( "search test correct token, wrong uid", function() {

	$.mockjaxClear();
	
    var uid = "007";
    var authToken = "1234test1234";
    var search = "ade";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/search/,
		urlParams: [
			'q',
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
	
	searchRest({'q':search,'auth':authToken,'uid':uid});
	equal(status, 401);

	$.mockjaxClear();
	});



test( "search test", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var query = "ade";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/search/,
		urlParams: [
			'q',
			'auth',
			'uid'
		],
		responseText: 
		[{
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
	
	var result = search(query);
	var expected=[{
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
		}];

	equal(result.name,expected.name);

	$.mockjaxClear();

});