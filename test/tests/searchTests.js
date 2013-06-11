var url = "https://www.dliv.in/rest/";

asyncTest( "search REST test", function() {
	$.mockjaxClear();
	
	var uid = "1234";
    var authToken = "test1234test";
    var search = "ade";
    var url="search";

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
			equal(settings.data.q, search, "haku parametri ei muutu");
		}
	});

	rest({'q':search,'auth':authToken,'uid':uid},url,
		function(data) {
			start();
			searchResult = data;
			success(data);
			$.mockjaxClear();
		},
		function(data) {
			start();
			searchResult = data;
			error(data);
			$.mockjaxClear();
		});

	

});


asyncTest( "search correct id token", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var search = "ade";
    var url="search";
	
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
	
	rest({'q':search,'auth':authToken,'uid':uid},url,
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

asyncTest( "search correct token, uid, cant find anything", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var search = "ade";
    var url="search";
	
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
	
	rest({'q':search,'auth':authToken,'uid':uid},url,
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


asyncTest( "search wrong token, correct uid", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "tokenWoken";
    var search = "ade";
    var url="search";
	
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
	
	rest({'q':search,'auth':authToken,'uid':uid},url,
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



asyncTest( "search test correct token, wrong uid", function() {

	$.mockjaxClear();
	
    var uid = "007";
    var authToken = "1234test1234";
    var search = "ade";
    var url="search";
	
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
	
	rest({'q':search,'auth':authToken,'uid':uid},url,
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



asyncTest( "search test", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var query = "ade";
    var url="search";
	
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
	search(query,function(result){
		start();
equal(result.name,expected.name);

	$.mockjaxClear();
	});
	

	

});







asyncTest("searhlistParse with image  TEst", function(){

	var item={name:"Test",img:"http://test.kuva.png",DL_id:"1234"}
	var result = searchListParse(item);
	var expected = "<li name=\"Test\" id=\"searchLink1234\"><img class=\"searchImages\" src=\"http://test.kuva.png\"\" alt=\"kuva\"></img><p>Test</p></li>";
	start();
	equal(result,expected);
});

asyncTest("searhlistParse without image  TEst", function(){

	var item={name:"Test",img:"",DL_id:"1234"}
	var result = searchListParse(item);
	var expected = "<li name=\"Test\" id=\"searchLink1234\"><img class=\"emptySearchImages\" src=\"../../resources/images/tyhja.png\"\" alt=\"kuva\"></img><p>Test</p></li>";
	start();
	equal(result,expected);
});


asyncTest("updateSearchResults test",function(){
	var items=[{name:"Test1",img:""},{name:"Test2",img:"http://test.com.tyhja.png"}];
	$("body").append('<div id="searchResults"></div>');
	updateSearchResults(items);
	var result = $("#searchResults").html();
	var expected = "<h1>Other</h1><ul id=\"searchResultsOther\" class=\"searchCategory\"><li name=\"Test1\" id=\"searchLinkundefined\"><img class=\"emptySearchImages\" src=\"../../resources/images/tyhja.png\" \"=\"\" alt=\"kuva\"><p>Test1</p></li><li name=\"Test2\" id=\"searchLinkundefined\"><img class=\"searchImages\" src=\"http://test.com.tyhja.png\" \"=\"\" alt=\"kuva\"><p>Test2</p></li></ul>";
	start();
	equal(result,expected);
	$("#searchResults").remove();
	
});


asyncTest("updateSearchResults empty result test",function(){
	var items={success : "1"};
	$("body").append('<div id="searchResults"></div>');
	updateSearchResults(items);
	var result = $("#searchResults").html();
	var expected = "";
	start();
	equal(result,expected);
	$("#searchResults").remove();
	
});

asyncTest( "processResult test", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var searchWord = "ade";
    var url="search";
	
	$.mockjax({
		url: "*",
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
	$("body").append('<div id="searchResults"></div>');
	searchWordCheck=searchWord;

	processResult(searchWord,function(){
		start();
		var result = $("#searchResults").html();
	var expected = "<h1>Users</h1><ul id=\"searchResultsUsers\" class=\"searchCategory\"><li name=\"Adele Vuohi\" id=\"searchLink8653\"><img class=\"searchImages\" src=\"https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif\" \"=\"\" alt=\"kuva\"><p>Adele Vuohi</p></li></ul><h1>Things</h1><ul id=\"searchResultsThings\" class=\"searchCategory\"><li name=\"Sadeantura 1GS00\" id=\"searchLink7559\"><img class=\"emptySearchImages\" src=\"../../resources/images/tyhja.png\" \"=\"\" alt=\"kuva\"><p>Sadeantura 1GS00</p></li><li name=\"Sadevesikaivo SVK1\" id=\"searchLink8654\"><img class=\"emptySearchImages\" src=\"../../resources/images/tyhja.png\" \"=\"\" alt=\"kuva\"><p>Sadevesikaivo SVK1</p></li><li name=\"Sadevesikaivo SVK2\" id=\"searchLink8655\"><img class=\"emptySearchImages\" src=\"../../resources/images/tyhja.png\" \"=\"\" alt=\"kuva\"><p>Sadevesikaivo SVK2</p></li></ul><h1>Projects</h1><ul id=\"searchResultsProjects\" class=\"searchCategory\"><li name=\"JADE\" id=\"searchLink7610\"><img class=\"searchImages\" src=\"https://dlfwwwfiles.s3.amazonaws.com/images/7610/thumb_top.jpg\" \"=\"\" alt=\"kuva\"><p>JADE</p></li></ul>";
	equal(result,expected);
	$("#searchResults").remove();
	$.mockjaxClear();
	});
	
	

});

asyncTest( "processResult word has changed test", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var searchWord = "ade";
    var url="search";
	
	$.mockjax({
		url: "*",
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
	$("body").append('<div id="searchResults"></div>');
	searchWordCheck="muuttunut";

	processResult(searchWord,function(){
		start();
		var result = $("#searchResults").html();
	var expected = "";
	equal(result,expected);
	$("#searchResults").remove();
	$.mockjaxClear();
	});
	
	

});





asyncTest("timedSearch test",function(){


	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var searchWord = "ade";
    var url="search";
	
	$.mockjax({
		url: "*",
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
	$("body").append('<div id="searchResults"></div>');

	timedSearch(searchWord,function(){
		setTimeout(function(){
		var result="";
		result = $("#searchResults").html();

		var expected = "<h1>Users</h1><ul id=\"searchResultsUsers\" class=\"searchCategory\"><li name=\"Adele Vuohi\" id=\"searchLink8653\"><img class=\"searchImages\" src=\"https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif\" \"=\"\" alt=\"kuva\"><p>Adele Vuohi</p></li></ul><h1>Things</h1><ul id=\"searchResultsThings\" class=\"searchCategory\"><li name=\"Sadeantura 1GS00\" id=\"searchLink7559\"><img class=\"emptySearchImages\" src=\"../../resources/images/tyhja.png\" \"=\"\" alt=\"kuva\"><p>Sadeantura 1GS00</p></li><li name=\"Sadevesikaivo SVK1\" id=\"searchLink8654\"><img class=\"emptySearchImages\" src=\"../../resources/images/tyhja.png\" \"=\"\" alt=\"kuva\"><p>Sadevesikaivo SVK1</p></li><li name=\"Sadevesikaivo SVK2\" id=\"searchLink8655\"><img class=\"emptySearchImages\" src=\"../../resources/images/tyhja.png\" \"=\"\" alt=\"kuva\"><p>Sadevesikaivo SVK2</p></li></ul><h1>Projects</h1><ul id=\"searchResultsProjects\" class=\"searchCategory\"><li name=\"JADE\" id=\"searchLink7610\"><img class=\"searchImages\" src=\"https://dlfwwwfiles.s3.amazonaws.com/images/7610/thumb_top.jpg\" \"=\"\" alt=\"kuva\"><p>JADE</p></li></ul>";
		equal(result,expected);
		$("#searchResults").remove();
		start();
	},1000);
	
	});
	


});
