test( "rest login test", function() {


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
	loginRest(username,password);
	equal(getToken(),"test1234test");

	$.mockjaxClear();

	});

test( "rest login test 2", function() {


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
	loginRest(username,password);
	equal(getToken(),"test1234test");

	$.mockjaxClear();

	});

test( "rest login test 3", function() {


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
	loginRest(username,password);
	equal(getToken(),null);

	$.mockjaxClear();

	});
test( "rest login test 4", function() {
	equal(getToken(),null);

	$.mockjaxClear();

	});