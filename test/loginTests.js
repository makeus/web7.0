

test( "rest login correct username and password", function() {

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
	login(username,password);
	equal(getToken(),"test1234test");

	$.mockjaxClear();

	});

test( "rest login long response time", function() {


    var username="test";
    var password="test";
	$.mockjax({
		url: "*",
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
		url: "*",
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

	$.mockjaxClear();

	});
test( "rest login getDL_id", function() {


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
	login(username,password);
	equal(getDL_id(),"1234");

	$.mockjaxClear();

	});

test( "rest login wrong username and password", function() {


    var username="test";
    var password="test";
	$.mockjax({
		url: "*",
		responseText: {
			success: "0"
		}
	});
	login(username,password);
	equal(getToken(),null);

	$.mockjaxClear();

	});
