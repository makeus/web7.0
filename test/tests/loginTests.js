var url = "https://www.dliv.in/rest/";

test( "login REST test", function() {

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

	rest(opts,url,
		function(data){
			success(data);
			if(getStatus() == 1) {
					saveToken(data);
					saveDL_id(data);
			}
		},
		function(data,t,m){
			error(data,t,m)
		});

	$.mockjaxClear();

});

test( "rest login correct username and password", function() {

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
	
	login(username,password);
	equal(getToken(),"test1234test");

	$.mockjaxClear();

	});

test( "rest login long response time", function() {

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

	login(username,password);
	equal(getToken(),"test1234test");

	$.mockjaxClear();

	});

test( "rest login timeout!", function() {

	$.mockjaxClear();

    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		isTimeout: true,
	});
	login(username,password);
	equal(getStatus(), 0);
	equal(getToken(),null);

	$.mockjaxClear();

	});

test( "rest login 500", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		status: 500
	});
	login(username,password);
	equal(getStatus(), 500);
	equal(getToken(),null);

	$.mockjaxClear();

});

test( "rest login 404", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		status: 404
	});
	
	login(username,password);
	equal(getStatus(), 404);
	equal(getToken(),null);

	$.mockjaxClear();

});

test( "rest login 501", function() {

	$.mockjaxClear();
	
    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		status: 501
	});
	login(username,password);
	equal(getStatus(), 501);
	equal(getToken(),null);

	$.mockjaxClear();

});

test( "rest login getDL_id", function() {

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
	login(username,password);
	equal(getStatus(), 1);
	equal(getDL_id(),"1234");

	$.mockjaxClear();

	});

test( "rest login wrong username and password", function() {

	$.mockjaxClear();

    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			success: "0"
		}
	});
	login(username,password);
	equal(getStatus(), -1);
	equal(getToken(),null);

	$.mockjaxClear();

	});
