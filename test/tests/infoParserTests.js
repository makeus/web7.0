test( "parseItemtest item,hash,type found", function() {

var userHash= {};
userHash['1234']=
        {
            DL_id: "1234",
            type: "user",
            sub_type: "",
            relations: "7795:,8658",
            name: "Adele Vuohi",
            img: "goats-picture.gif",
            edited: "2013-05-22 07:31:55",
            created: "2013-05-21 13:55:43",
            created_by: "8653",
            edited_by: "8653"
        };
userHash['4321']=
        {
            DL_id: "4321",
            type: "user",
            sub_type: "",
            relations: "7795:,8658",
            name: "A deli goat",
            img: "goats-picture.gif",
            edited: "2013-05-22 07:31:55",
            created: "2013-05-21 13:55:43",
            created_by: "8653",
            edited_by: "8653"
        };

var item={};
item[0]={
            id: "1234",
            type: "message",
            sub_type: "",
            DL_id: "4321",
            from_DL_id: "1234",
            subject: "message",
            link: "",
            content: "message_body",
            locatio: "",
            time_from: "0000-00-00 00:00:00",
            time_to: "0000-00-00 00:00:00",
            acl: "read",
            whitelist_dlid: "",
            completed: null,
            completed_by: null,
            created: "2013-05-17 11:10:31",
            comments: "",
            relations: ""
        };
var type=item[0].type;


var expected ="<li class='listEL' id='1234'><section  class='eventElem' ><img src=goats-picture.gif alt='pic' /><div class='unandmsg'><div class='sendandre'><p class='user_name'>Adele Vuohi>>> A deli goat</p></div><section class='message_content'><p class='subject'>message</p><p class='content'>message_body</section></div></section></li>";

equal(parseItem(item[0], userHash, type), expected);
});

test( "parseItemtest item not found", function() {


var userHash= {};
userHash['1234']=
        {
            DL_id: "1234",
            type: "user",
            sub_type: "",
            relations: "7795:,8658",
            name: "Adele Vuohi",
            img: "goats-picture.gif",
            edited: "2013-05-22 07:31:55",
            created: "2013-05-21 13:55:43",
            created_by: "8653",
            edited_by: "8653"
        };
userHash['4321']=
        {
            DL_id: "4321",
            type: "user",
            sub_type: "",
            relations: "7795:,8658",
            name: "A deli goat",
            img: "goats-picture.gif",
            edited: "2013-05-22 07:31:55",
            created: "2013-05-21 13:55:43",
            created_by: "8653",
            edited_by: "8653"
        };

var item=[];

var type="";


var expected ="";

equal(parseItem(item[0], userHash, type), expected);
});


test( "parseItemtest userHash not found", function() {


var userHash = {};

var item={};
item[0]={
            id: "1234",
            type: "message",
            sub_type: "",
            DL_id: "4321",
            from_DL_id: "1234",
            subject: "message",
            link: "",
            content: "message_body",
            locatio: "",
            time_from: "0000-00-00 00:00:00",
            time_to: "0000-00-00 00:00:00",
            acl: "read",
            whitelist_dlid: "",
            completed: null,
            completed_by: null,
            created: "2013-05-17 11:10:31",
            comments: "",
            relations: ""
        };
var type=item[0].type;


var expected ="";

equal(parseItem(item[0], userHash, type), expected);

});

test( "parseItemtest type not found", function() {


var userHash = {};
userHash['1234']=
        {
            DL_id: "1234",
            type: "user",
            sub_type: "",
            relations: "7795:,8658",
            name: "Adele Vuohi",
            img: "goats-picture.gif",
            edited: "2013-05-22 07:31:55",
            created: "2013-05-21 13:55:43",
            created_by: "8653",
            edited_by: "8653"
        };
userHash['4321']=
        {
            DL_id: "4321",
            type: "user",
            sub_type: "",
            relations: "7795:,8658",
            name: "A deli goat",
            img: "goats-picture.gif",
            edited: "2013-05-22 07:31:55",
            created: "2013-05-21 13:55:43",
            created_by: "8653",
            edited_by: "8653"
        };

var item={};
item[0]={
            id: "1234",
            type: "message",
            sub_type: "",
            DL_id: "4321",
            from_DL_id: "1234",
            subject: "message",
            link: "",
            content: "message_body",
            locatio: "",
            time_from: "0000-00-00 00:00:00",
            time_to: "0000-00-00 00:00:00",
            acl: "read",
            whitelist_dlid: "",
            completed: null,
            completed_by: null,
            created: "2013-05-17 11:10:31",
            comments: "",
            relations: ""
        };
var type="";


var expected ="";

equal(parseItem(item[0], userHash, type), expected);

});


test( "dateTimeToDateTest", function() {
	var date = "1000-02-03 04:05:00";
	var expected = "03.02.1000";
	equal(datetimetoDate(date), expected);
});

test( "dateTimeToTimeTest", function() {
	var date = "1000-02-03 04:05:00";
	var expected = "04:05";
	equal(datetimetoTime(date), expected);
});

test( "Show messages test found message", function() {
    var userId = "1234";
var authToken = "test1234test";
var offset = 10;
var limit = 10;
var types="message";
var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit, 'types':types};
var url = "stream";

    $.mockjaxClear();
    
    $.mockjax({
        url: /https:\/\/www.dliv.in\/rest\/stream/,
        urlParams: [
            'uid',
            'auth',
            'offset',
            'limit',
            'types'
        ],
        responseText: [{
            id: "1234",
            type: "message",
            sub_type: "",
            DL_id: "4321",
            from_DL_id: "4321",
            subject: "message",
            link: "",
            content: "message_body",
            locatio: "",
            time_from: "0000-00-00 00:00:00",
            time_to: "0000-00-00 00:00:00",
            acl: "read",
            whitelist_dlid: "",
            completed: null,
            completed_by: null,
            created: "2013-05-17 11:10:31",
            comments: "",
            relations: ""
        }]
    });

    $.mockjax(
    {
        url:/https:\/\/www.dliv.in\/rest\/dlid/,
        responseText: [{
            DL_id: "4321",
            type: "user",
            sub_type: "",
            relations: "7795:,8658",
            name: "Adele Vuohi",
            img: "img.png",
            edited: "2013-05-22 07:31:55",
            created: "2013-05-21 13:55:43",
            created_by: "4321",
            edited_by: "4321"
        }]
    });


    var expected = "<li class='listEL' id='1234'><section  class='eventElem' ><img src=img.png alt='pic' /><div class='unandmsg'><div class='sendandre'><p class='user_name'>Adele Vuohi</p></div><section class='message_content'><p class='subject'>message</p><p class='content'>message_body</section></div></section></li>";
    
    equal(showMessages(),expected);
    equal(getStatus(),1);
    $.mockjaxClear();
});

test( "Show messages test no results", function() {
    var userId = "1234";
    var authToken = "test1234test";
    var offset = 10;
    var limit = 10;
    var types="message";
    var opts = {'uid': userId, 'auth': authToken, 'offset': offset, 'limit': limit, 'types':types, 'dlid':1234};

    $.mockjaxClear();
    
    $.mockjax({
        url: /https:\/\/www.dliv.in\/rest\/stream/,
        urlParams: [
            'uid',
            'auth',
            'offset',
            'limit',
            'types'
        ],
        status:201,
        responseText: ""
    });
    var expected = "";
    
    equal(showMessages(),expected);
    equal(getStatus(),201);
    $.mockjaxClear();
});
