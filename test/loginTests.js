var url = "https://www.dliv.in/rest/";

test( "login REST test", function() {

    var username="test";
    var password="test";

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

	loginRest(username, password);
	
	$.mockjaxClear();

});

test( "rest login correct username and password", function() {

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


    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		isTimeout: true,
		responseText: {
			DL_id: "1234",
			authtoken: "test1234test",
			staff: null
		}
	});
	login(username,password);
	equal(getToken(),null);

	$.mockjaxClear();

	});
test( "rest login gettoken without logging in", function() {
	equal(getToken(),null);

	});

test( "rest login getDL_id", function() {


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
	equal(getDL_id(),"1234");

	$.mockjaxClear();

	});

test( "rest login wrong username and password", function() {


    var username="test";
    var password="test";
	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			success: "0"
		}
	});
	login(username,password);
	equal(getToken(),null);

	$.mockjaxClear();

	});
