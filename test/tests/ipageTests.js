asyncTest( "ipage parsemessage test", function() {
	$.mockjaxClear();
	var sender = "testio tesdia";
	var receiver = "testtenseeen";
	

	$.mockjax({
		url: "*",
		responseText: [{
			DL_id: "1234",
			created: "2013-05-16 08:11:28",
			created_by: "1234",
			edited: "2013-05-27 12:26:52",
			edited_by: "1234",
			img: "https://dlfwwwfiles.s3.amazonaws.com/images/8620/thumb_1495esn.jpg",
			name: sender,
			relations: "7795:,8639,2740:user,8640,8642,8619:friend,8616:friend,8617:friend,8653:provider,8618:friend",
			sub_type: "",
			type: "user"
		},
		{
			DL_id: "4321",
			created: "2013-05-16 08:11:28",
			created_by: "4321",
			edited: "2013-05-27 12:26:52",
			edited_by: "4321",
			img: "https://dlfwwwfiles.s3.amazonaws.com/images/8620/thumb_1495esn.jpg",
			name: receiver,
			relations: "7795:,8639,2740:user,8640,8642,8619:friend,8616:friend,8617:friend,8653:provider,8618:friend",
			sub_type: "",
			type: "user"
		}
		]
	});
	$("body").append('<div id="all"><section id="ipageMessage"><div id ="messageContent"><img src=""></img><div id="ipageInfo"><div id="ipageFormAndSubject"></div><div id="completeMarker"><input id="completeCheckbox" type="checkbox" /><label for="completeCheckbox">Mark as completed</label></div></div><div id="ipageContent"></div></div></section><section id="ipageComments"><ul id="listOfComments"></ul></section><section id="commentArea"><textarea id="" class=\'commentArea\' placeholder=\'Add your comment here\' rows=1></textarea><div id="sendMessageBox" hidden class="addComment"><a class="addComment" href="#">+</a></div></section></div>');

	var stream = [{
			id: "4444",
			type: "message",
			sub_type: "",
			DL_id: "1234",
			from_DL_id: "1234",
			subject: "en kerro",
			link: "",
			content: "",
			location: "",
			time_from: "0000-00-00 00:00:00",
			time_to: "0000-00-00 00:00:00",
			acl: "",
			whitelist_dlid: "",
			completed: null,
			completed_by: null,
			created: "2013-06-06 12:16:38",
			comments: "",
			relations: ""
			}];
			
	saveStream(stream);
	setIPageID("4444");
	parseMessage();
	setTimeout(function(){
		start();
		result = $("#all").html();
		ok(result.indexOf(stream[0]["subject"] != -1));
		ok(result.indexOf(stream[0]["content"] != -1));
		ok(result.indexOf(sender) != -1);
		ok(result.indexOf(receiver) != -1);

		$("#all").remove();
		$.mockjaxClear();	
	},2000);
});