/**
* Testit t‰nne
* API http://api.qunitjs.com/
* Testin raportti tulee index.html:‰‰n
* esim ok(boolean, [kuvaus]);
*/


test( "testtest", function() {
  	ok(1 == "1");
  	equal(1,1);
  	ok(1 == "1", "onko 1 sama kuin \"1\"");

});

asyncTest( "resttest", function() {
	$.mockjax({
		url: 'https://dliv.in/rest/Authtoken?u=mathias.keus@helsinki.fi&p=aaa',
		responseText: {
			DL_id: "asd",
			authtoken: "asdasd",
			staff: null
		}
	});
	

	$.getJSON('https://dliv.in/rest/Authtoken?u=mathias.keus@helsinki.fi&p=aaa', function(data) {
		start();		
		equal(data.DL_id, "asd");
		equal(data.authtoken, "asdasd");
		equal(data.staff, null);

	});


});

