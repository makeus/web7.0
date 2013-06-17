function initsearch() {
	setupPage({
		bar: true,
		barBackButton: true
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

}


function searchListParse(item){
	var ret = '<li name="'+item.name+'" id="searchLink' +item.DL_id+ '">';
	if(item.img!=""){
		ret += '<img class="searchImages" src="'+item.img+'"" alt="kuva"></img>';
	}else{
		ret += '<img class="emptySearchImages" src="'+'../../resources/images/tyhja.png'+'"" alt="kuva"></img>';
	}
	ret += '<p>'+item.name+'</p>'+'</li>';
	return ret;
}

function appendSearchCategory(item, category) {

	if (!$("#searchResults" + category).length){$("#searchResults").append('<h1>' + category + '</h1><ul id="searchResults' + category + '" class="searchCategory"></ul>');}
	$("#searchResults" + category).append(searchListParse(item));
	$("#searchLink"+item.DL_id).click(function(){
		view.push("EPage", {'dlid':item.DL_id});
	});
}

function updateSearchResults(results){
	$("#searchResults").empty();
	if(results.success==1){
		return;
	}

	$.each(results,function(i,item){
		switch(item.type){
			case 'user':
				appendSearchCategory(item, "Users");
				break;
			case 'animal':
				appendSearchCategory(item, "Animals");
				break;
			case 'thing':
				appendSearchCategory(item, "Things");
				break;
			case 'project':
				appendSearchCategory(item, "Projects");
				break;
			case 'space':
				appendSearchCategory(item, "Places");
				break;
			case 'group':
				appendSearchCategory(item, "Groups");
				break;
			case 'contract':
				appendSearchCategory(item, "Contracts");
				break;
			default:
				appendSearchCategory(item, "Other");
				break;
		}
	});

}


var timeout;
var searchWordCheck;

function processResult(searchWord,done){
	search(searchWord,function(result){
		if(searchWordCheck==searchWord){
			updateSearchResults(result);
		} else {
			console.log("NO!!!!!!!!");
		}

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

	if(timeout){
		clearTimeout(timeout);
	}

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
    	getUserArray(info3,done);
	});
}