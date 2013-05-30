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


function searchListParse(item){
	if(item.img!=""){
		return '<li>'+'<img class="searchImages" src="'+item.img+'"" alt="kuva"></img>'+'<p>'+item.name+'</p>'+'</li>';
	}else{
		return '<li>'+'<img class="emptySearchImages" src="'+'../../resources/images/tyhja.png'+'"" alt="kuva"></img>'+'<p>'+item.name+'</p>'+'</li>';
	}
}
function updateSearchResults(results){
	$("#searchResults").empty();
	if(results.success==1){
		return;
	}

	$.each(results,function(i,item){
		switch(item.type){
			case 'user':
				if (!$("#searchResultsUser").length){$("#searchResults").append('<h1>Persons</h1><ul id="searchResultsUser" class="searchCategory"></ul>');}
				$("#searchResultsUser").append(searchListParse(item));
				break;
			case 'animal':
				if (!$("#searchResultsAnimal").length){$("#searchResults").append('<h1>Animals</h1><ul id="searchResultsAnimal" class="searchCategory"></ul>');}
				$("#searchResultsAnimal").append(searchListParse(item));
				break;
			case 'thing':
				if (!$("#searchResultsThing").length){$("#searchResults").append('<h1>Things</h1><ul id="searchResultsThing" class="searchCategory"></ul>');}
				$("#searchResultsThing").append(searchListParse(item));
				break;
			case 'project':
				if (!$("#searchResultsProject").length){$("#searchResults").append('<h1>Projects</h1><ul id="searchResultsProject" class="searchCategory"></ul>');}
				$("#searchResultsProject").append(searchListParse(item));
				break;
			case 'space':
				if (!$("#searchResultsSpace").length){$("#searchResults").append('<h1>Places</h1><ul id="searchResultsSpace" class="searchCategory"></ul>');}
				$("#searchResultsSpace").append(searchListParse(item));
				break;
			case 'group':
				if (!$("#searchResultsGroup").length){$("#searchResults").append('<h1>Groups</h1><ul id="searchResultsGroup" class="searchCategory"></ul>');}
				$("#searchResultsGroup").append(searchListParse(item));
				break;
			case 'contract':
				if (!$("#searchResultsContract").length){$("#searchResults").append('<h1>Contracts</h1><ul id="searchResultsContract" class="searchCategory"></ul>');}
				$("#searchResultsContract").append(searchListParse(item));
				break;
			default:
				if (!$("#searchResultsDefault").length){$("#searchResults").append('<h1>Other</h1><ul id="searchResultsDefault" class="searchCategory"></ul>');}
				$("#searchResultsDefault").append(searchListParse(item));
				break;
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