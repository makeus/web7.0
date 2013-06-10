document.addEventListener("DOMContentLoaded", function() {
	setupPage({
		bar: true
	});

	$("#searchInput").focus();

	$("#back").click(function() {
		popView();
	});

	//tähän tilalle history() kun hölmöydet on korjattu restistä
	//eli ei koskaan!
	historyTemp(function(data){
		updateSearchResults(data);
	});
	$("#searchInput").bind('input',function(){
		timedSearch($("#searchInput").val(),function(){});
	});

});


function searchListParse(item){
	if(item.img!=""){
		return '<li name="'+item.name+'" id="searchLink' +item.DL_id+ '">'+'<img class="searchImages" src="'+item.img+'"" alt="kuva"></img>'+'<p>'+item.name+'</p>'+'</li>';
	}else{
		return '<li name="'+item.name+'" id="searchLink' +item.DL_id+ '">'+'<img class="emptySearchImages" src="'+'../../resources/images/tyhja.png'+'"" alt="kuva"></img>'+'<p>'+item.name+'</p>'+'</li>';
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
				$("#searchLink"+item.DL_id).click(function(){
					view.push("EPage", "index.html?dlid="+item.DL_id);
				});
				break;
			case 'animal':
				if (!$("#searchResultsAnimal").length){$("#searchResults").append('<h1>Animals</h1><ul id="searchResultsAnimal" class="searchCategory"></ul>');}
				$("#searchResultsAnimal").append(searchListParse(item));
				$("#searchLink"+item.DL_id).click(function(){
					view.push("EPage", "index.html?dlid="+item.DL_id);
				});
				break;
			case 'thing':
				if (!$("#searchResultsThing").length){$("#searchResults").append('<h1>Things</h1><ul id="searchResultsThing" class="searchCategory"></ul>');}
				$("#searchResultsThing").append(searchListParse(item));
				$("#searchLink"+item.DL_id).click(function(){
					view.push("EPage", "index.html?dlid="+item.DL_id);
				});
				break;
			case 'project':
				if (!$("#searchResultsProject").length){$("#searchResults").append('<h1>Projects</h1><ul id="searchResultsProject" class="searchCategory"></ul>');}
				$("#searchResultsProject").append(searchListParse(item));
				$("#searchLink"+item.DL_id).click(function(){
					view.push("EPage", "index.html?dlid="+item.DL_id);
				});
				break;
			case 'space':
				if (!$("#searchResultsSpace").length){$("#searchResults").append('<h1>Places</h1><ul id="searchResultsSpace" class="searchCategory"></ul>');}
				$("#searchResultsSpace").append(searchListParse(item));
				$("#searchLink"+item.DL_id).click(function(){
					view.push("EPage", "index.html?dlid="+item.DL_id);
				});
				break;
			case 'group':
				if (!$("#searchResultsGroup").length){$("#searchResults").append('<h1>Groups</h1><ul id="searchResultsGroup" class="searchCategory"></ul>');}
				$("#searchResultsGroup").append(searchListParse(item));
				$("#searchLink"+item.DL_id).click(function(){
					view.push("EPage", "index.html?dlid="+item.DL_id);
				});
				break;
			case 'contract':
				if (!$("#searchResultsContract").length){$("#searchResults").append('<h1>Contracts</h1><ul id="searchResultsContract" class="searchCategory"></ul>');}
				$("#searchResultsContract").append(searchListParse(item));
				$("#searchLink"+item.DL_id).click(function(){
					view.push("EPage", "index.html?dlid="+item.DL_id);
				});
				break;
			default:
				if (!$("#searchResultsDefault").length){$("#searchResults").append('<h1>Other</h1><ul id="searchResultsDefault" class="searchCategory"></ul>');}
				$("#searchResultsDefault").append(searchListParse(item));
				$("#searchLink"+item.DL_id).click(function(){
					view.push("EPage", "index.html?dlid="+item.DL_id);
				});
				break;
		}
	});

}


var timeout;
var searchWordCheck;
function processResult(searchWord,done){
	search(searchWord,function(result){
		if(searchWordCheck==searchWord){ updateSearchResults(result);}
		else{ console.log("NO!!!!!!!!");}
		done();
	});
	
}
function timedSearch(searchWord,done){
	if(searchWord==""){
		historyTemp(function(data){
		updateSearchResults(data);
		});
		if(timeout){clearTimeout(timeout);}
		return;
	}
	searchWordCheck=searchWord;
	if(timeout){clearTimeout(timeout);}
	timeout=setTimeout(function(){
		processResult(searchWord,done);
	},200);
}


function historyTemp(done){
	getHistory(function(info2){
		var info3="";
   		 $.each(info2,function(key,value){
    	if(key!='DL_id'){
    		info3=info3 + key.replace('dlid-','') + ',';
		}
   		 });
   		info3=info3.slice(0,-1);
    	var opts={'dl_ids':info3,'auth':getToken(),'uid':getDL_id()};
    	getUserArray(opts,done);
	});
}