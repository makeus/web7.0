asyncTest( "parseItemtest item,hash,type found", function() {
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

    item[0]=
        {
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

    var expected ="<li class='listEL' id='1234' uid='1234'><section  class='eventElem' ><img src=goats-picture.gif alt='pic' /><div class='unandmsg'><div class='sendandre'><p class='user_name'>Adele Vuohi>>> A deli goat</p><p class='timeMsgCreated'>one month ago</p></div><section class='message_content'><p class='subject'>message</p><p class='content'>message_body</section></div></section></li>";
    start();
    equal(parseItem(item[0], userHash, type), expected);
});


asyncTest( "parseItemtest item not found", function() {
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
    start();
    equal(parseItem(item[0], userHash, type), expected);
});


asyncTest( "parseItemtest userHash not found", function() {
    var userHash = {};

    var item={};
    item[0]=
        {
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
    start();
    equal(parseItem(item[0], userHash, type), expected);

});

asyncTest( "parseItemtest type not found", function() {
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
    item[0]=
        {
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
        }
    var type="";

    var expected ="";
    start();
    equal(parseItem(item[0], userHash, type), expected);

});


asyncTest( "dateTimeToDateTest", function() {
	var date = "1000-02-03 04:05:00";
	var expected = "03.02.1000";
    start();
	equal(datetimetoDate(date), expected);
});

asyncTest( "dateTimeToTimeTest", function() {
	var date = "1000-02-03 04:05:00";
	var expected = "04:05";
    start();
	equal(datetimetoTime(date), expected);
});

