document.addEventListener("DOMContentLoaded", function() {
	setPage({
		bar: true
	});

	$("#searchInput").focus();

	$("#back").click(function() {
		popView();
	});
	updateSearchResults(getHistory());
	$("#searchInput").change(function(){
		timedSearch($("#searchInput").val())
	});

});



function updateSearchResults(results){
	$.each(results,function(item){
		$("#searchResults").append('<ul>'+item.asd); //CONTINUE HERE YES YES
	});
}


var timeout;
var searchWordCheck;
function processResult(searchWord){
	var results = search(searchWord);
	if(searchWordCheck==searchWord){ updateSearchResults(results);}
	else{ console.log("NO!!!!!!!!");}
}
function timedSearch(searchWord){
	searchWordCheck=searchWord;
	if(timeout){clearTimeout(timeout);}
	timeout=setTimeout(function(){
		processResult(searchWord);
	},5000);
}