var url = "https://www.dliv.in/rest/";

asyncTest( "history REST test", function() {
	$.mockjaxClear();
	
	var uid = "1234";
    var authToken = "test1234test";
    var dl_id = "4321";
    var url="gethistory";

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/gethistory/,
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
			$.mockjaxClear();
		},
		function(data) {
			start();
			searchResult = data;
			error(data);
			$.mockjaxClear();
		});

	

});


asyncTest( "history correct id and token", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var dl_id = "4321";
    var url="gethistory";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/gethistory/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		responseText: [{
			'dlid-1231': "1369646561",
			'dlid-1232': "1368789250",
			'dlid-1233': "1369646645",
			'dlid-1234': "1368789348",
			'dlid-1235': "1369650511",
			'dlid-1236': "1369646642",
			'dlid-1237': "1368789261",
			'dlid-1238': "1368789315",
			'dlid-1239': "1368788734"

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

asyncTest( "history correct token, uid, no permission to view page", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var dl_id = "4321";
    var url="gethistory";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/gethistory/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		responseText: [{
			success: "-1"

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


asyncTest( "history test wrong token, correct uid", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "tokenWoken";
    var dl_id = "4321";
    var url="gethistory";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/gethistory/,
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
			start(),
			searchResult = data;
			error(data);
			equal(status, 401);

	
	$.mockjaxClear();
		});
	
	});

asyncTest( "history test correct token, wrong uid", function() {

	$.mockjaxClear();
	
    var uid = "007";
    var authToken = "1234test4321";
    var dl_id = "4321";
    var url="gethistory";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/gethistory/,
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



asyncTest( "getHistory test", function() {

	$.mockjaxClear();
	
    var uid = "1234";
    var authToken = "test1234test";
    var dl_id = "4321";
    var url="gethistory";
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/gethistory/,
		urlParams: [
			'dl_id',
			'auth',
			'uid'
		],
		responseText: [{
			'dlid-1231': '1369646561',
			'dlid-1232': '1368789250',
			'dlid-1233': '1369646645',
			'dlid-1234': '1368789348',
			'dlid-1235': '1369650511',
			'dlid-1236': '1369646642',
			'dlid-1237': '1368789261',
			'dlid-1238': '1368789315',
			'dlid-1239': '1368788734'

		}]
	});
	var expected = [{
	  'dlid-1231': '1369646561',
	  'dlid-1232': '1368789250',
	  'dlid-1233': '1369646645',
	  'dlid-1234': '1368789348',
	  'dlid-1235': '1369650511',
	  'dlid-1236': '1369646642',
	  'dlid-1237': '1368789261',
	  'dlid-1238': '1368789315',
	  'dlid-1239': '1368788734'
	}];
	getHistory(function(result){
		start();
			equal(result.name,expected.name);

	$.mockjaxClear();
	});


});