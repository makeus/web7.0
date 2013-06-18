var url = "https://www.dliv.in/rest/";
var authtoken = "test1234test";
var userId = "1234";
var to_dl_id = "4321";
var from_dl_id = "6543";
var type = "message";
var subject = "subject";
var link = "";
var username="test";
var password="test";


asyncTest( "addActivity REST test", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		urlParams: [
			'uid',
			'auth',
			'to_dl_id',
			'from_dl_id',
			'type',
			'subject',
			'link'
		],
		response: function(settings) {
			equal(settings.data.uid, userId, "Userid ei muutu");
			equal(settings.data.auth, authtoken, "Auth ei muutu");
			equal(settings.data.to_dl_id, to_dl_id, "TO_DL_ID ei muutu");
			equal(settings.data.from_dl_id, from_dl_id, "From_DL_ID ei muutu");
			equal(settings.data.type, type, "Type ei muutu");
			equal(settings.data.subject, subject, "Subject ei muutu");
			equal(settings.data.link, link, settings.data.link, "Link ei muutu");
		}
		
	});

	addActivity({'uid':userId, 'auth':authtoken, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id, 'type':type, 'subject':subject, 'link':link},function(data){
		start();
			$.mockjaxClear();

	},function(data){
		start();

	$.mockjaxClear();
	});


});

asyncTest( "addActivity unauthorized", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "stream",
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	addActivity({'userId':userId, 'authtoken':authtoken, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id, 'type':type, 'subject':subject, 'link':link},function(data){
		succeess(data);
		start();
		equal(status, 401);

	$.mockjaxClear();
	},function(data){
		error(data);
		start();
		equal(status, 401);

	$.mockjaxClear();
	});
	
});

asyncTest( "addActivity fail method test", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "stream",
		status: 405,
		statusText: "Method not allowed",
		responseText: {
			ErrorCode: 405,
			ErrorMessage: "Method not allowed"
		}
	});
	
	addActivity({'userId':userId, 'authtoken':authtoken, 'to_dl_id':to_dl_id, 'from_dl_id':from_dl_id, 'type':type, 'subject':subject, 'link':link},function(data){
		succeess(data);
		start();
		equal(status, 405);

	$.mockjaxClear();
	},function(data){
		error(data);
		start();
		equal(status, 405);

	$.mockjaxClear();
	});

	
});

asyncTest( "addMessage test", function() {

	$.mockjaxClear();
		
	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			DL_id: userId,
			authtoken: authtoken,
			staff: null
		}

	})

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		urlParams: [
			'uid',
			'auth',
			'to_dl_id',
			'from_dl_id',
			'type',
			'subject',
		],
		response: function(settings) {
			equal(settings.data.uid, userId, "Userid ei muutu");
			equal(settings.data.auth, authtoken, "Auth ei muutu");
			equal(settings.data.to_dl_id, to_dl_id, "TO_DL_ID ei muutu");
			equal(settings.data.from_dl_id, from_dl_id, "From_DL_ID ei muutu");
			equal(settings.data.type, type, "Type ei muutu");
			equal(settings.data.subject, subject, "Subject ei muutu");
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

	login(username, password,function(data){
		addMessage(to_dl_id, from_dl_id, subject,"",null,null,function(data){
			start();
			$.mockjaxClear();
		});

	
	});
	

});

asyncTest( "addMessage unauthorized", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "stream",
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	addMessage(to_dl_id, from_dl_id, subject, link,null,null,function(data){
		start();
		equal(getStatus(), 401);

	$.mockjaxClear();
	});
	
});

asyncTest( "addMessage fail method test", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "stream",
		status: 405,
		statusText: "Method not allowed",
		responseText: {
			ErrorCode: 405,
			ErrorMessage: "Method not allowed"
		}
	});
	addMessage(to_dl_id, from_dl_id, subject, link,null, null,function(data){
		start();
		equal(getStatus(), 405);

	$.mockjaxClear();
	});
	
});


asyncTest( "addEvent test", function() {
	var type="cal";

	$.mockjaxClear();
		
	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			DL_id: userId,
			authtoken: authtoken,
			staff: null
		}

	})

	$.mockjax({
		url: /https:\/\/www.dliv.in\/rest\/stream/,
		urlParams: [
			'uid',
			'auth',
			'to_dl_id',
			'from_dl_id',
			'type',
			'subject',
		],
		response: function(settings) {
			equal(settings.data.uid, userId, "Userid ei muutu");
			equal(settings.data.auth, authtoken, "Auth ei muutu");
			equal(settings.data.to_dl_id, to_dl_id, "TO_DL_ID ei muutu");
			equal(settings.data.from_dl_id, from_dl_id, "From_DL_ID ei muutu");
			equal(settings.data.type, type, "Type ei muutu");
			equal(settings.data.subject, subject, "Subject ei muutu");
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

	login(username, password,function(data){
		addEvent(to_dl_id, from_dl_id, subject,"",null,"1","2","3",null, null, function(data){
			start();
				$.mockjaxClear();

		});

	});
	

});
asyncTest( "addEvent unauthorized", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "stream",
		status: 401,
		statusText: "Unauthorized",
		responseText: {
			ErrorCode: 401,
			ErrorMessage: "Unauthorized"
		}
	});
	addEvent(to_dl_id, from_dl_id, subject,"",null,"1","2","3",null, null, function(data){
		start();
		equal(getStatus(), 401);

	$.mockjaxClear();
	});
	
});

asyncTest( "addEvent fail method test", function() {

	$.mockjaxClear();
	
	$.mockjax({
		url: url + "stream",
		status: 405,
		statusText: "Method not allowed",
		responseText: {
			ErrorCode: 405,
			ErrorMessage: "Method not allowed"
		}
	});
	addEvent(to_dl_id, from_dl_id, subject,"",null,"1","2","3",null, null, function(data){
		start();
		equal(getStatus(), 405);

	$.mockjaxClear();
	});
	
});

asyncTest( "getCCList test", function() {
	$.mockjaxClear();
	

	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			DL_id: userId,
			authtoken: authtoken,
			staff: null
		}

	});

	$.mockjax(
	{
		url:/https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_ids',
			'auth',
			'uid'],
		responseText: [{
        	DL_id: "7795",
        	type: "user",
        	sub_type: "",
	        relations: "7795:,8658:",
	        name: "Adele Vuohi",
	        img: "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
	        edited: "2013-05-22 07:31:55",
	        created: "2013-05-21 13:55:43",
	        created_by: "8653",
	        edited_by: "8653"
    	},
    	{
        	DL_id: "8658",
        	type: "user",
        	sub_type: "",
	        relations: "7795:,8658:",
	        name: "Adele Vuohi",
	        img: "https://dlfwwwfiles.s3.amazonaws.com/images/8653/thumb_303657-goats-picture.gif",
	        edited: "2013-05-22 07:31:55",
	        created: "2013-05-21 13:55:43",
	        created_by: "8653",
	        edited_by: "8653"
    	}]
	});

	login(username, password, function(data) {
		var relationString = '7795:,8658:';
		saveRelations(parseRelations(relationString));
		
		getCCList(function(data){
			start();
			equal(getStatus(), 1);
		});
		$.mockjaxClear();
	});
});

asyncTest( "getCCList test no relations", function() {
	$.mockjaxClear();
	

	$.mockjax({
		url: url + "Authtoken",
		responseText: {
			DL_id: userId,
			authtoken: authtoken,
			staff: null
		}

	});

	$.mockjax(
	{
		url:/https:\/\/www.dliv.in\/rest\/dlid/,
		urlParams: [
			'dl_ids',
			'auth',
			'uid'],
		responseText: [{
        	DL_id: "7795",
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
        	DL_id: "8658",
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

	login(username, password, function(data) {
		localStorage.setItem("relations", "");
		getCCList(function(data){
			start();
			equal(getStatus(), 1);
		});
		$.mockjaxClear();
	});
});
