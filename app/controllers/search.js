document.addEventListener("DOMContentLoaded", function() {
	setPage({
		bar: true
	});

	$("#searchInput").focus();

	$("#back").click(function() {
		popView();
	});

	//tähän tilalle history() kun hölmöydet on korjattu restistä
	updateSearchResults(historyTemp());
	$("#searchInput").bind('input',function(){
		timedSearch($("#searchInput").val())
	});

});



function updateSearchResults(results){
	$("#searchResults").empty();
	if(results.success==1){
		return;
	}
	$.each(results,function(item){
		if(results[item].img!=""){
			$("#searchResults").append('<li>'+'<img class="searchImages" src="'+results[item].img+'"" alt="kuva"></img>'+'<p>'+results[item].name+'</p>'+'</li>');
		}else{
			$("#searchResults").append('<li>'+'<img class="emptySearchImages" src="'+'../../resources/images/tyhja.png'+'"" alt="kuva"></img>'+'<p>'+results[item].name+'</p>'+'</li>');
		}
	});
}


var timeout;
var searchWordCheck;
function processResult(searchWord){
	var result = search(searchWord);
	if(searchWordCheck==searchWord){ updateSearchResults(result);}
	else{ console.log("NO!!!!!!!!");}
}
function timedSearch(searchWord){
	if(searchWord==""){
		updateSearchResults(historyTemp());
		if(timeout){clearTimeout(timeout);}
		return;
	}
	searchWordCheck=searchWord;
	if(timeout){clearTimeout(timeout);}
	timeout=setTimeout(function(){
		processResult(searchWord);
	},500);
}


function historyTemp(){
	var info2 = getHistory();
    var info3="";
    $.each(info2,function(key,value){
    	if(key!='DL_id'){
    		info3=info3 + key.replace('dlid-','') + ',';
		}
    });
    info3=info3.slice(0,-1);
    var opts={'dl_ids':info3,'auth':getToken(),'uid':getDL_id()};
    var url="dlid"
    var info=rest(opts,url,
		function(data) {
			result = data;
			success(data);
		},
		function(data) {
			result = data; 
			error(data);
		});
    return info;
}