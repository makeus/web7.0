var url = "https://www.dliv.in/rest/";

asyncTest( "login REST test", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
    var url = "Authtoken";
	var opts = {'u': username, 'p': password};

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/Authtoken/,
		urlParams: [
			'u',
			'p'
		],
		response: function(settings) {
			equal(settings.data.u, username, "Username ei muutu");
			equal(settings.data.p, password, "Password ei muutu");
			this.responseText = { DL_id: "1234", authtoken: "test1234test", staff: null }
		}
		
	});

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

	rest(opts,url,
		function(data){
			success(data);
			if(getStatus() == 1) {
					saveToken(data);
					saveDL_id(data);
			}
			start();
		},
		function(data,t,m){
			error(data,t,m);
			start();
		});

	$.mockjaxClear();

});

asyncTest( "rest login correct username and password", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			DL_id: "1234",
			authtoken: "test1234test",
			staff: null
		}
	});

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
	
	login(username,password,function(data){
		start();
		equal(getToken(),"test1234test");

	$.mockjaxClear();
	});
	

	});

asyncTest( "rest login long response time", function() {

	$.mockjaxClear();

    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		responseTime: 10000,
		responseText: {
			DL_id: "1234",
			authtoken: "test1234test",
			staff: null
		}
	});

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

	login(username,password,function(data){
		start();
		equal(getToken(),"test1234test");

	$.mockjaxClear();
	});
	

	});


asyncTest( "rest login 500", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		status: 500
	});
	login(username,password,function(data){
		start();
		equal(getStatus(), 500);
	equal(getToken(),null);

	$.mockjaxClear();
	});
	

});

asyncTest( "rest login 404", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		status: 404
	});
	
	login(username,password,function(data){
		start();
		equal(getStatus(), 404);
	equal(getToken(),null);

	$.mockjaxClear();
	});
	

});

asyncTest( "rest login 501", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		status: 501
	});
	login(username,password,function(data){
		start();
		equal(getStatus(), 501);
	equal(getToken(),null);

	$.mockjaxClear();
	});
	

});

asyncTest( "rest login getDL_id", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
	$.mockjax({
		url: "*",
		responseText: {
			DL_id: "1234",
			authtoken: "test1234test",
			staff: null
		}
	});
	login(username,password,function(data){
		start();
		equal(getStatus(), 1);
	equal(getDL_id(),"1234");

	$.mockjaxClear();
	});
	

	});

asyncTest( "rest login wrong username and password", function() {

	$.mockjaxClear();

    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			success: "0"
		}
	});
	login(username,password,function(data){
		start();
		equal(getStatus(), -1);
	equal(getToken(),null);

	$.mockjaxClear();
	});
	

	});
